# Robot Showcase — Web Export

Exported from `robot_showcase.blend` (Blender 5.1, glTF 2.0).

## Files

| File | Size | Use |
|---|---|---|
| `robot_showcase.glb` | 2.1 MB | **LOD0** — full detail. 179 meshes (full part hierarchy), 16 materials, all 6 animation tracks. Use for the hero/interactive viewer. |
| `robot_showcase_lod1.glb` | 1.7 MB | **LOD1** — same hierarchy and animations, geometry decimated ~50%. Mid-distance. |
| `robot_showcase_lod2.glb` | 0.6 MB | **LOD2** — static. Meshes joined per material → **15 draw calls**, 363k → 51k polys. No animations. Far distance / low-power fallback. |
| `textures/` | | Baked 512×512 tiles from the procedural materials (see below). |

## Loading notes (three.js)

- **All three GLBs use Draco compression** — wire up `DRACOLoader` alongside `GLTFLoader`.
- Node hierarchy: `Robot_Root → Body / Left_Motor → Left_Wheel / Right_Motor → Right_Wheel` (wheels ride their motor mounts; only `Robot_Root` ever translates).
- Animations (LOD0/LOD1): `Robot_RootAction` (travel, turns, turntable, sway), `BodyAction` (balancing pitch), `Left_WheelAction` / `Right_WheelAction` (distance-matched wheel spin incl. differential turning), `Pulley_Idler_L/RAction`. Play them all together with an `AnimationMixer` (30 fps):
  - BOOT_SEQUENCE 1–120 · IDLE 121–300 · SCAN_MODE 301–450 · MOVEMENT_MODE 451–650 · SHOWCASE_MODE 651–900
  - frames 910–1150 are a **drivetrain test sequence** (balance / forward / turn L / turn R / reverse) — clamp playback to 1–900 for product display
- The LED state system in Blender is driver-based (scene properties `led_r/g/b/int`) and **does not export** to glTF. Recreate it in the viewer by animating `emissive`/`emissiveIntensity` on the `MAT_LED_*` materials — the state colors are: idle cyan `(0.05, 0.85, 1.0)`, warning orange `(1.0, 0.32, 0.02)`, error red flash, success green sweep `(0.04, 1.0, 0.22)`.

## Textures

glTF can't carry Blender's procedural shaders, so the exported materials use constant PBR factors. For the four materials whose character comes from a pattern, tileable maps were baked (Cycles, 512²):

- `carbon_fiber_*` — basecolor / roughness / normal (the weave)
- `steel_brushed_*` — roughness / normal carry the brushing; basecolor is correctly flat
- `rubber_tire_*` — normal carries the surface grain
- `pcb_green_*` — near-flat; PCB detail is mostly geometry (silkscreen objects)

All meshes carry a `Texture UVs` layer from the original CAD export, so the maps can be applied directly — but the CAD UV layout is auto-generated, so check texel density per part; box/triplanar mapping is the robust fallback. Skipping them entirely is also fine — the constant-factor materials already read well at web scale.
