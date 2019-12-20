
import { effect, sink, state } from 'redux-sink';

import { Hospital } from '@models/hospital/hospital';
import { Illness } from '@models/illness/illness';
import { HttpClient } from '@services/http-client/http-client';

@sink('patient-add', new HttpClient())
export class PatientAddSink {
  @state public illness?: Illness;
  @state public hospital?: Hospital;
  @state public painLevel?: number;
  @state public submitting: boolean;

  constructor(private httpClient: HttpClient) { }

  @effect
  public reset() {
    this.illness = undefined;
    this.hospital = undefined;
    this.painLevel = undefined;
    this.submitting = false;
  }

  @effect
  public async submit() {
    this.submitting = true;
    await this.httpClient.post(`/api/hospital/${this.hospital?.id}/patient`, {
      illnessId: this.illness?.id,
      levelOfPain: this.painLevel,
    });
    this.reset();
  }
}
