import test from 'node:test';
import assert from 'node:assert/strict';
import Subscriber from './Subscriber.js';
test('accepts long domain endings and plus-addressing', () => {
 for (const email of ['qa@example.info','qa+test@example.technology','qa@example.co.zm']) assert.equal(new Subscriber({email}).validateSync(),undefined);
});
test('rejects malformed and oversized addresses', () => {
 for (const email of ['', 'not-email','a@@example.com','a b@example.com','a@example..com','a'.repeat(255)+'@example.com']) assert.ok(new Subscriber({email}).validateSync());
});
