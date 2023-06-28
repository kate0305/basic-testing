import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 4, b: 1, action: Action.Subtract, expected: 3 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 1, b: 3, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 1, action: '£', expected: null },
  { a: 2, b: 1, action: '€', expected: null },
  { a: 2, b: 1, action: '@', expected: null },
  { a: '2', b: 1, action: Action.Add, expected: null },
  { a: '2', b: '1', action: Action.Add, expected: null },
  { a: 2, b: '1', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator($a, $b, $action) should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
