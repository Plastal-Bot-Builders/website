import React, { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { SectionEditor } from './SectionEditor';
import { StorySection } from '../content/Story';
function Harness() {
 const [sections, setSections] = useState<StorySection[]>([]);
 return <SectionEditor value={sections} onChange={setSections} />;
}
test('authors can add, reorder and remove sections without writing code', () => {
 render(<Harness />);
 fireEvent.click(screen.getByRole('button', {name:'Add section'}));
 fireEvent.change(screen.getByLabelText('Heading'), {target:{value:'First'}});
 fireEvent.change(screen.getByLabelText('Text'), {target:{value:'First body'}});
 fireEvent.click(screen.getByRole('button', {name:'Add section'}));
 let groups = screen.getAllByRole('group');
 fireEvent.change(within(groups[1]).getByLabelText('Heading'), {target:{value:'Second'}});
 fireEvent.click(within(groups[1]).getByRole('button', {name:'Move up'}));
 groups = screen.getAllByRole('group');
 expect((within(groups[0]).getByLabelText('Heading') as HTMLInputElement).value).toBe('Second');
 expect((within(groups[1]).getByLabelText('Text') as HTMLTextAreaElement).value).toBe('First body');
 fireEvent.click(within(groups[0]).getByRole('button', {name:'Remove section'}));
 expect(screen.getAllByRole('group')).toHaveLength(1);
 expect((screen.getByLabelText('Heading') as HTMLInputElement).value).toBe('First');
});
