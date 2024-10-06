import { Either, isLeft, isRight, Left, left, Right, right } from './either';

describe('Either', () => {
  test('left() should return a Left instance', () => {
    const error = 'Something went wrong';
    const result = left(error);

    expect(isLeft(result)).toBe(true);
    expect(isRight(result)).toBe(false);
    expect(result).toHaveProperty('left', error);
  });

  test('right() should return a Right instance', () => {
    const value = 42;
    const result = right(value);

    expect(isRight(result)).toBe(true);
    expect(isLeft(result)).toBe(false);
    expect(result).toHaveProperty('right', value);
  });

  test('Either should handle different types correctly', () => {
    const error = 'Error message';
    const success = 100;

    const leftResult = left(error);
    const rightResult = right(success);

    expect(isLeft(leftResult)).toBe(true);
    expect(leftResult).toHaveProperty('left', error);

    expect(isRight(rightResult)).toBe(true);
    expect(rightResult).toHaveProperty('right', success);
  });

  test('left() should allow any type as an error', () => {
    const customError = { message: 'Custom error', code: 500 };
    const result = left(customError);

    expect(isLeft(result)).toBe(true);
    expect(result).toEqual({left: customError});
  });

  test('right() should allow any type as a value', () => {
    const customValue = { data: 'Sample data' };
    const result = right(customValue);

    expect(isRight(result)).toBe(true);
    expect(result).toEqual({right: customValue});
  });
  
  test('isLeft() should return true for Left instance', () => {
    const error = 'An error occurred';
    const result = left(error);

    expect(isLeft(result)).toBe(true);
    expect(isRight(result)).toBe(false);
  });

  test('isLeft() should return false for Right instance', () => {
    const value = 42;
    const result = right<string, number>(value);

    expect(isLeft(result)).toBe(false);
    expect(isRight(result)).toBe(true);
  });

  test('isRight() should return true for Right instance', () => {
    const success = { data: 'Success data' };
    const result = right(success);

    expect(isRight(result)).toBe(true);
    expect(isLeft(result)).toBe(false);
    expect(result).toHaveProperty('right', success);
  });

  test('isRight() should return false for Left instance', () => {
    const error = new Error('Some error');
    const result = left(error);

    expect(isRight(result)).toBe(false);
    expect(isLeft(result)).toBe(true);
    expect(result).toHaveProperty('left', error);
  });

  test('isLeft and isRight should handle different types', () => {
    const leftResult = left('Error');
    const rightResult = right(true);

    expect(isLeft(leftResult)).toBe(true);
    expect(isRight(leftResult)).toBe(false);

    expect(isRight(rightResult)).toBe(true);
    expect(isLeft(rightResult)).toBe(false);
  });
});