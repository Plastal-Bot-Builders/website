import test from 'node:test';
import assert from 'node:assert/strict';
import Post from './Post.js';
import Event from './Events.js';
const sections = [{type:'text', heading:'What you will learn',text:'Build a robot'}, {type:'image', image:'https://example.com/photo.jpg',alt:'Robot',caption:'Workshop'}];
test('blog saves sections and cover/author images', () => {
 const post = new Post({title:'Story',slug:'story',content:'Intro',sections,coverImage:'https://example.com/cover.jpg',authorAvatar:'https://example.com/author.jpg',excerpt:'Summary'});
 assert.equal(post.validateSync(),undefined);
 assert.equal(post.toObject().sections[1].caption,'Workshop');
 assert.equal(post.toObject().coverImage,'https://example.com/cover.jpg');
 assert.equal(post.toObject().authorAvatar,'https://example.com/author.jpg');
});
test('events store ordered sections', () => {
 const event = new Event({title:'Workshop',description:'Intro',date:'2027-01-01',location:'Lusaka',sections});
 assert.equal(event.validateSync(),undefined);
 assert.equal(event.toObject().sections[0].heading,'What you will learn');
});
test('rejects unsupported blocks, unsafe image schemes, and excessive sections', () => {
 for (const sections of [[{type:'html'}],[{type:'image',image:'javascript:alert(1)'}],Array.from({length:41},()=>({type:'text'}))]) {
  assert.ok(new Post({title:'Story',slug:'story',content:'Intro',sections}).validateSync());
 }
});
