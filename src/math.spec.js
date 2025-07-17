import { isEven } from './math';

it('isEven should return true if given an even number', () => {
  isEven(2);
  expect(isEven(2)).toBe(true);
});

it('isEven should return false if given an odd number', () => {
  isEven(1);
  expect(isEven(1)).toBe(false);
});
