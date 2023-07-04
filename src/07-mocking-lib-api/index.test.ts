import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/users';
const data = [
  {
    id: 1,
    username: 'Bret',
  },
];

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    expect.assertions(1);
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(spy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    expect.assertions(1);
    const spy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    expect.assertions(1);
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({ data: data });
    await expect(throttledGetDataFromApi(relativePath)).resolves.toBe(data);
  });
});
