import React, { useEffect, useRef, useState } from 'react';
import { asset } from '../../utils/asset';
import './LiveContours.css';

/**
 * The contour lines, moving: the still drawing (contours.svg) with a canvas over it that takes its place once it
 * runs. The canvas draws the same Copperbelt land from a small height map, and lets the contour levels sink, so
 * every line slides slowly downhill and new rings open on the hilltops. After five levels each line sits where the
 * fifth line below it began, bold on bold, so the movement never jumps.
 *
 * The still drawing stays when the canvas cannot run (no WebGL, reduced motion, data saver, a failed download).
 * Height map: public/resources/RoboCore/contours-height.bin (how it is made: README.md here).
 */

const ART = 1080; // the still drawing's size in px (contours.svg); line widths below are in its px
const LEVELS = 40; // contour intervals the height map's 16 bits span
const INDEX = 5; // every 5th line is bold
const SECONDS_PER_LEVEL = 4; // a line takes this long to reach the next line's place
const MAX_PIXEL_RATIO = 2;

const VERTEX = 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }';

/* Once per size: the land's level and slope for every pixel of the canvas, packed into an RGBA texture
   (the level within its group of five in 16 bits, the slope in 16 bits), so a frame costs one lookup. */
const BAKE = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform sampler2D uHeight;
uniform float uGrid;
uniform float uScale;
uniform vec2 uRes;

float sampleAt(vec2 ij) {
  vec4 t = texture2D(uHeight, (clamp(ij, 0.0, uGrid - 1.0) + 0.5) / uGrid);
  return (floor(t.a * 255.0 + 0.5) * 256.0 + floor(t.r * 255.0 + 0.5)) / 65535.0;
}
vec4 weights(float t) {
  float t2 = t * t;
  float t3 = t2 * t;
  return vec4(-0.5 * t3 + t2 - 0.5 * t, 1.5 * t3 - 2.5 * t2 + 1.0, -1.5 * t3 + 2.0 * t2 + 0.5 * t, 0.5 * t3 - 0.5 * t2);
}
float row(vec2 i, float j, vec4 w) {
  return sampleAt(i + vec2(-1.0, j)) * w.x + sampleAt(i + vec2(0.0, j)) * w.y
       + sampleAt(i + vec2(1.0, j)) * w.z + sampleAt(i + vec2(2.0, j)) * w.w;
}
vec2 pack(float v) {
  float x = floor(clamp(v, 0.0, 1.0) * 65535.0 + 0.5);
  float hi = floor(x / 256.0);
  return vec2(hi, x - hi * 256.0) / 255.0;
}
void main() {
  // This pixel's place on the drawing (0..1), the drawing scaled to cover the canvas from its centre.
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 uv = 0.5 + (px - 0.5 * uRes) / (uScale * ${ART}.0);
  // Smooth (Catmull-Rom) reading of the height map.
  vec2 st = uv * uGrid - 0.5;
  vec2 i = floor(st);
  vec4 wx = weights(st.x - i.x);
  vec4 wy = weights(st.y - i.y);
  float level = (row(i, -1.0, wx) * wy.x + row(i, 0.0, wx) * wy.y + row(i, 1.0, wx) * wy.z + row(i, 2.0, wx) * wy.w) * ${LEVELS}.0;
  float slope = length(vec2(dFdx(level), dFdy(level))) * uScale; // levels per px of the drawing
  gl_FragColor = vec4(pack(fract(level / ${INDEX}.0)), pack(slope * 2.0));
}`;

/* Every frame: how far this pixel is from the nearest line, once the levels have sunk by uPhase. */
const DRAW = `
precision highp float;
uniform sampler2D uBaked;
uniform vec2 uRes;
uniform float uScale;
uniform float uPhase;
uniform vec3 uColor;

float unpack(vec2 v) {
  return (floor(v.x * 255.0 + 0.5) * 256.0 + floor(v.y * 255.0 + 0.5)) / 65535.0;
}
void main() {
  vec4 b = texture2D(uBaked, gl_FragCoord.xy / uRes);
  float level = unpack(b.rg) * ${INDEX}.0 + uPhase;
  float line = floor(level + 0.5);
  float slope = unpack(b.ba) * 0.5;
  float away = abs(level - line) / max(slope, 0.000001); // px of the drawing to the middle of the line
  float width = mod(line, ${INDEX}.0) < 0.5 ? 2.0 : 1.0;
  float cover = clamp((width * 0.5 - away) * uScale + 0.5, 0.0, 1.0);
  // On nearly flat ground a line would race across: let it fade out there.
  float a = cover * smoothstep(1.0 / 900.0, 1.0 / 380.0, slope);
  gl_FragColor = vec4(uColor * a, a);
}`;

function compile(gl: WebGLRenderingContext, vertex: string, fragment: string): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  const sources: Array<[number, string]> = [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]];
  for (let k = 0; k < sources.length; k++) {
    const shader = gl.createShader(sources[k][0]);
    if (!shader) return null;
    gl.shaderSource(shader, sources[k][1]);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
    gl.attachShader(program, shader);
  }
  gl.bindAttribLocation(program, 0, 'p');
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

/** Runs the lines on the canvas. Returns how to stop them, or null when this browser cannot draw them. */
function startContours(canvas: HTMLCanvasElement, heights: Uint8Array, onLive: () => void, onLost: () => void): (() => void) | null {
  const grid = Math.sqrt(heights.length / 2);
  if (grid < 16 || grid !== Math.floor(grid)) return null; // not the height map (a missing file answers with a page)
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const g = gl;
  const precise = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_FLOAT);
  if (!g.getExtension('OES_standard_derivatives') || !precise || precise.precision < 23) return null;
  const bakeProgram = compile(g, VERTEX, BAKE);
  const drawProgram = compile(g, VERTEX, DRAW);
  const corners = g.createBuffer();
  const heightTexture = g.createTexture();
  const bakedTexture = g.createTexture();
  const target = g.createFramebuffer();
  if (!bakeProgram || !drawProgram || !corners || !heightTexture || !bakedTexture || !target) return null;

  g.bindBuffer(g.ARRAY_BUFFER, corners);
  g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW); // one triangle over the canvas
  g.enableVertexAttribArray(0);
  g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);
  g.disable(g.BLEND);
  g.disable(g.DEPTH_TEST);

  const plain = (texture: WebGLTexture) => {
    g.bindTexture(g.TEXTURE_2D, texture);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.NEAREST);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
  };
  plain(heightTexture);
  g.pixelStorei(g.UNPACK_ALIGNMENT, 1);
  // Two bytes a sample, low byte first: luminance = low, alpha = high.
  g.texImage2D(g.TEXTURE_2D, 0, g.LUMINANCE_ALPHA, grid, grid, 0, g.LUMINANCE_ALPHA, g.UNSIGNED_BYTE, heights);
  plain(bakedTexture);

  const bakeAt = {
    height: g.getUniformLocation(bakeProgram, 'uHeight'),
    grid: g.getUniformLocation(bakeProgram, 'uGrid'),
    scale: g.getUniformLocation(bakeProgram, 'uScale'),
    res: g.getUniformLocation(bakeProgram, 'uRes'),
  };
  const drawAt = {
    baked: g.getUniformLocation(drawProgram, 'uBaked'),
    res: g.getUniformLocation(drawProgram, 'uRes'),
    scale: g.getUniformLocation(drawProgram, 'uScale'),
    phase: g.getUniformLocation(drawProgram, 'uPhase'),
    colour: g.getUniformLocation(drawProgram, 'uColor'),
  };
  const limit = g.getParameter(g.MAX_TEXTURE_SIZE) as number;
  let scale = 1; // canvas px per px of the drawing
  let baked = false;
  let colour = [217 / 255, 151 / 255, 26 / 255];
  let phase = 0;

  const readColour = () => {
    const parts = getComputedStyle(canvas).color.match(/[\d.]+/g);
    if (parts && parts.length >= 3) colour = [Number(parts[0]) / 255, Number(parts[1]) / 255, Number(parts[2]) / 255];
  };

  const draw = () => {
    g.bindFramebuffer(g.FRAMEBUFFER, null);
    g.viewport(0, 0, canvas.width, canvas.height);
    g.useProgram(drawProgram);
    g.bindTexture(g.TEXTURE_2D, bakedTexture);
    g.uniform1i(drawAt.baked, 0);
    g.uniform2f(drawAt.res, canvas.width, canvas.height);
    g.uniform1f(drawAt.scale, scale);
    g.uniform1f(drawAt.phase, phase);
    g.uniform3f(drawAt.colour, colour[0], colour[1], colour[2]);
    g.drawArrays(g.TRIANGLES, 0, 3);
  };

  /** Fits the canvas to its box and works out the land for every pixel. False when there is nothing to draw on. */
  const fit = (): boolean => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const width = Math.min(Math.round(canvas.clientWidth * ratio), limit);
    const height = Math.min(Math.round(canvas.clientHeight * ratio), limit);
    if (width < 1 || height < 1) return false;
    if (baked && width === canvas.width && height === canvas.height) return true;
    baked = false;
    canvas.width = width;
    canvas.height = height;
    scale = Math.max(width, height) / ART; // the square drawing covers the box, as the still one does
    g.bindTexture(g.TEXTURE_2D, bakedTexture);
    g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, width, height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
    g.bindFramebuffer(g.FRAMEBUFFER, target);
    g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, bakedTexture, 0);
    if (g.checkFramebufferStatus(g.FRAMEBUFFER) !== g.FRAMEBUFFER_COMPLETE) return false;
    g.viewport(0, 0, width, height);
    g.useProgram(bakeProgram);
    g.bindTexture(g.TEXTURE_2D, heightTexture);
    g.uniform1i(bakeAt.height, 0);
    g.uniform1f(bakeAt.grid, grid);
    g.uniform1f(bakeAt.scale, scale);
    g.uniform2f(bakeAt.res, width, height);
    g.drawArrays(g.TRIANGLES, 0, 3);
    baked = true;
    return true;
  };

  let request = 0;
  let last = 0;
  let running = 0; // seconds of movement so far
  let nextColour = 0;
  let visible = true;
  let stopped = false;
  let shown = false;

  const frame = (now: number) => {
    request = 0;
    if (stopped) return;
    if (now - last >= 30) { // about 30 frames a second is plenty for lines this slow
      const step = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      running += step;
      // Hold the still drawing while the canvas takes over, then ease into the movement.
      const ease = Math.min(Math.max((running - 0.8) / 1.6, 0), 1);
      phase = (phase + (step * ease) / SECONDS_PER_LEVEL) % INDEX;
      if (now >= nextColour) {
        readColour();
        nextColour = now + 1000;
      }
      if (fit()) {
        draw();
        if (!shown) {
          shown = true;
          onLive();
        }
      }
    }
    if (visible) request = window.requestAnimationFrame(frame);
  };
  const wake = () => {
    if (!request && !stopped && visible) {
      last = 0;
      request = window.requestAnimationFrame(frame);
    }
  };

  // Resizing clears a canvas: draw again at once so the lines never blink.
  const resized = 'ResizeObserver' in window ? new ResizeObserver(() => { if (!stopped && shown && fit()) draw(); }) : null;
  if (resized) resized.observe(canvas);
  // No frames while the lines are off screen.
  const seen = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); }, { threshold: 0 })
    : null;
  if (seen) seen.observe(canvas);
  const lost = (event: Event) => {
    event.preventDefault();
    stopped = true;
    onLost();
  };
  canvas.addEventListener('webglcontextlost', lost);
  wake();

  return () => {
    stopped = true;
    if (request) window.cancelAnimationFrame(request);
    if (resized) resized.disconnect();
    if (seen) seen.disconnect();
    canvas.removeEventListener('webglcontextlost', lost);
    g.deleteProgram(bakeProgram);
    g.deleteProgram(drawProgram);
    g.deleteBuffer(corners);
    g.deleteTexture(heightTexture);
    g.deleteTexture(bakedTexture);
    g.deleteFramebuffer(target);
  };
}

const LiveContours: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let stop: (() => void) | null = null;
    let left = false;
    // After the page has painted: the still drawing is already there.
    const timer = window.setTimeout(() => {
      fetch(asset('resources/RoboCore/contours-height.bin'))
        .then((response) => (response.ok ? response.arrayBuffer() : Promise.reject(new Error(String(response.status)))))
        .then((buffer) => {
          if (left) return;
          stop = startContours(el, new Uint8Array(buffer), () => setLive(true), () => setLive(false));
        })
        .catch(() => undefined); // the still drawing stays
    }, 500);
    return () => {
      left = true;
      window.clearTimeout(timer);
      if (stop) stop();
    };
  }, []);

  return (
    <>
      <div className={`rc-contours${live ? ' is-resting' : ''}`} aria-hidden="true" />
      <canvas ref={canvas} className={`rc-contours-live${live ? ' is-live' : ''}`} aria-hidden="true" />
    </>
  );
};

export default LiveContours;
