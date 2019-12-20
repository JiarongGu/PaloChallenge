
import { mocked } from 'ts-jest/utils';

import { HttpClient } from '@services/http-client/http-client';
import { IllnessSink } from './illness-sink';

jest.mock('@services/http-client/http-client');

const mockHttpClient = mocked(new HttpClient(), true);

describe('sink:: hospital-sink', () => {
  beforeEach(() => {
    mockHttpClient.get.mockImplementation(x => {
      return Promise.resolve({} as any);
    });
  });

  it('should call api when load', async () => {
    const sink = new IllnessSink(mockHttpClient as any);
    const promise = sink.load();

    expect(sink.loading).toBeTruthy();
    await promise;
    expect(sink.loading).toBeFalsy();
    expect(mockHttpClient.get.mock.calls).toHaveLength(1);
  });
});
