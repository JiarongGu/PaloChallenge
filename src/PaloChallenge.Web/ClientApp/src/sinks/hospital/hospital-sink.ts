import { effect, sink, state } from 'redux-sink';

import { Hospital } from '@models/hospital/hospital';
import { HttpClient } from '@services/http-client/http-client';

@sink('hospital', new HttpClient())
export class HospitalSink {
  @state public hospitals: Array<Hospital> = [];
  @state public loading: boolean;

  constructor(private httpClient: HttpClient) { }

  @effect
  public async load() {
    this.loading = true;
    const response = await this.httpClient.get<Array<Hospital>>('/api/hospital');
    this.hospitals = response.data;
    this.loading = false;
  }
}
