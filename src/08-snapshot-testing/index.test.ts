import { generateLinkedList } from './index';

const value = [1, 2, 3];
const result = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: null,
        next: null,
      },
    },
  },
};
describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(value)).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(value)).toMatchSnapshot();
  });
});
