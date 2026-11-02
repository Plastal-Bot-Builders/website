import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Story, StorySection, imageSource } from './Story';
test('renders ordered content and escapes supplied HTML', () => {
 const sections: StorySection[] = [{type:'text',heading:'First',text:'<script>alert(1)</script>',image:'',alt:'',caption:''},{type:'list',heading:'Next',text:'One\nTwo',image:'',alt:'',caption:''}];
 const html = renderToStaticMarkup(<Story title="Workshop" sections={sections} />);
 expect(html).toContain('&lt;script&gt;'); expect(html).not.toContain('<script>');
 expect(html.indexOf('First')).toBeLessThan(html.indexOf('Next'));
 expect(html).toContain('<li>One</li>');
});
test('rejects executable and protocol-relative image sources', () => {
 expect(imageSource('javascript:alert(1)')).toBeUndefined();
 expect(imageSource('//untrusted.example/image')).toBeUndefined();
 expect(imageSource('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
});
