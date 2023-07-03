import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const pathToFile = 'file.txt';
const fileContent = 'content';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(setTimeout).toBeCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, 2000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 2000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(2000);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toBeCalled();
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(3000);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    expect.assertions(2);
    const spy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    expect.assertions(1);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect.assertions(1);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
