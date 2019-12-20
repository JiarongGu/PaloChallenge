import { mocked } from 'ts-jest/utils';

import { HttpClient } from '@services/http-client/http-client';
import { PatientAddSink } from './patient-add-sink';

jest.mock('@services/http-client/http-client');

const mockHttpClient = mocked(new HttpClient(), true);

describe('sink:: patient-add-sink', () => {
  beforeEach(() => {
    mockHttpClient.post.mockImplementation(x => {
      return Promise.resolve({} as any);
    });
  });

  it('should clear state when reset', () => {
    const sink = new PatientAddSink(mockHttpClient as any);
    sink.hospital = { name: 'test', id: 1, waitTime: 1 };
    sink.illness = { name: 'test', id: 1 };

    sink.reset();

    expect(sink.hospital).toBeUndefined();
    expect(sink.illness).toBeUndefined();
  });

  it('should call api when submit', async () => {
    const sink = new PatientAddSink(mockHttpClient as any);
    sink.hospital = { name: 'test', id: 1, waitTime: 1 };
    sink.illness = { name: 'test', id: 1 };

    const promise = sink.submit();

    expect(sink.submitting).toBeTruthy();
    await promise;
    expect(sink.submitting).toBeFalsy();
    expect(mockHttpClient.post.mock.calls).toHaveLength(1);
  });
});
