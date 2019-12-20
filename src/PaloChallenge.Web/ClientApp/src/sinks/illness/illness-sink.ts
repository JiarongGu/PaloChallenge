import { effect, sink, state } from 'redux-sink';

import { Illness } from '@models/illness/illness';
import { HttpClient } from '@services/http-client/http-client';

@sink('illness', new HttpClient())
export class IllnessSink {
  @state public illnesses: Array<Illness> = [];
  @state public loading: boolean;

  constructor(private httpClient: HttpClient) { }

  @effect
  public async load() {
    if (!this.illnesses.length) {
      this.loading = true;
      const response = await this.httpClient.get<Array<Illness>>('/api/illness');
      this.illnesses = response.data;
      this.loading = false;
    }
  }
}
