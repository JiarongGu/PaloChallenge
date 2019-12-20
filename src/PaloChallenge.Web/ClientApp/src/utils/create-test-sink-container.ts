import { SinkContainer } from 'redux-sink';

export function createTestSinkContainer() {
  const reduxSink = require('redux-sink');
  const sinkContainer = new SinkContainer();
  sinkContainer.createStore();
  reduxSink.useSink = jest.fn((sink) => sinkContainer.getSink(sink));

  return sinkContainer;
};
