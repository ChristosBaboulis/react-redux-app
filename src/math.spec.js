import { isEven } from './math';

it('first test', () => {
  isEven(2);
  expect(isEven(2)).toBe(true);
});
