import { sink, state } from 'redux-sink';

@sink('layout')
export class LayoutSink {
  @state public topMenu?: () => Array<JSX.Element> | null;
}