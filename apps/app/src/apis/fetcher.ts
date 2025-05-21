import Fetcher from '../../../../packages/utils/src/fetcher/fetcher';

export const baseUrl = 'http://3.39.18.57:8080';

export const fetcherInstance = new Fetcher({
  baseUrl,
  defaultHeaders: {
    Accept: 'application/json',
  },
});
