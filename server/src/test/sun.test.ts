// require('@jest/globals')
// require('../sum/sum')
import {describe, expect, test} from '@jest/globals';
import {sum} from '../sum/sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});