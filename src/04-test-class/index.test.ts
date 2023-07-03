import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const balance = 25;
const amount = 10;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const accaunt = getBankAccount(balance);
    expect(accaunt.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const accaunt = getBankAccount(balance);
    expect(() => accaunt.withdraw(balance + 10)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const firstAccaunt = getBankAccount(balance);
    const secondAccaunt = getBankAccount(balance);
    const firstAccauntBalance = firstAccaunt.getBalance();
    const amount = firstAccauntBalance + 10;
    expect(() => firstAccaunt.transfer(amount, secondAccaunt)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accaunt = getBankAccount(balance);
    expect(() => accaunt.transfer(amount, accaunt)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const accaunt = getBankAccount(balance);
    const firstAccauntBalance = accaunt.getBalance();
    const newBalance = firstAccauntBalance + amount;
    expect(accaunt.deposit(amount).getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const accaunt = getBankAccount(balance);
    const firstAccauntBalance = accaunt.getBalance();
    const newBalance = firstAccauntBalance - amount;
    expect(accaunt.withdraw(amount).getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const firstAccaunt = getBankAccount(balance);
    const secondAccaunt = getBankAccount(balance);
    const firstAccauntBalance = firstAccaunt.getBalance();
    const secondAccauntBalance = secondAccaunt.getBalance();
    const newBalanceOfFirstAcc = firstAccauntBalance - amount;
    const newBalanceOfSecondAcc = secondAccauntBalance + amount;

    firstAccaunt.transfer(amount, secondAccaunt);

    expect(firstAccaunt.getBalance()).toBe(newBalanceOfFirstAcc);
    expect(secondAccaunt.getBalance()).toBe(newBalanceOfSecondAcc);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);
    const accaunt = getBankAccount(balance);
    jest.spyOn(accaunt, 'fetchBalance').mockResolvedValue(1);
    await expect(accaunt.fetchBalance()).resolves.toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(1);
    const accaunt = getBankAccount(balance);
    const value = 1;
    jest.spyOn(accaunt, 'fetchBalance').mockResolvedValue(value);
    await accaunt.synchronizeBalance();
    expect(accaunt.getBalance()).toBe(value);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    const accaunt = getBankAccount(balance);
    jest.spyOn(accaunt, 'fetchBalance').mockResolvedValue(null);
    await expect(accaunt.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
