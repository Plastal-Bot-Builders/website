import React from 'react';
import { StorySection } from '../content/Story';
import { Button } from './AdminStyles';
export function SectionEditor({ value, onChange }: { value: StorySection[]; onChange: (value: StorySection[]) => void }) {
 const update = (i: number, patch: Partial<StorySection>) => onChange(value.map((s, j) => j === i ? {...s, ...patch} : s));
 const move = (i: number, delta: number) => { const next = [...value]; [next[i], next[i + delta]] = [next[i + delta], next[i]]; onChange(next); };
 return <div><h3>Page sections</h3><p>Add sections in the order readers should see them. No HTML or code needed. Image links should point to permanently hosted images.</p>
 {value.map((s, i) => <fieldset className="section-editor" key={i}><legend>Section {i + 1}</legend>
 <label>Layout<select value={s.type} onChange={e => update(i, {type: e.target.value as StorySection['type']})}><option value="text">Text</option><option value="image">Image with caption</option><option value="quote">Quote</option><option value="list">Bullet list</option></select></label>
 <label>Heading<input value={s.heading} maxLength={200} onChange={e => update(i, {heading:e.target.value})} /></label>
 {s.type === 'image' ? <><label>Image URL<input type="url" placeholder="https://…" value={s.image} onChange={e => update(i,{image:e.target.value})} required /></label><label>Image description (accessibility)<input value={s.alt} onChange={e => update(i,{alt:e.target.value})} required /></label></> : <label>{s.type === 'list' ? 'List items (one per line)' : 'Text'}<textarea rows={5} value={s.text} onChange={e => update(i,{text:e.target.value})} required /></label>}
 {(s.type === 'image' || s.type === 'quote') && <label>{s.type === 'quote' ? 'Attribution' : 'Caption'}<input value={s.caption} onChange={e => update(i,{caption:e.target.value})} /></label>}
 <div className="section-tools"><Button type="button" disabled={i === 0} onClick={() => move(i,-1)}>Move up</Button><Button type="button" disabled={i === value.length - 1} onClick={() => move(i,1)}>Move down</Button><Button type="button" onClick={() => onChange(value.filter((_,j) => j !== i))}>Remove section</Button></div>
 </fieldset>)}
 <Button type="button" disabled={value.length >= 40} onClick={() => onChange([...value,{type:'text',heading:'',text:'',image:'',alt:'',caption:''}])}>Add section</Button>
 </div>;
}
