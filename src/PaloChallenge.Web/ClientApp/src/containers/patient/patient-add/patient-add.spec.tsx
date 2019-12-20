import { shallow } from 'enzyme';
import * as React from 'react';
import { SinkContainer } from 'redux-sink';

import { createTestSinkContainer } from '@utils/create-test-sink-container';

import { DeviceType } from '@models/common';
import { BreakpointSink } from '@sinks/common';
import { PatientAddSection } from '../patient-add-section/patient-add-section';
import { PatientAddSubmit } from '../patient-add-submit/patient-add-submit';
import { PatientAdd } from './patient-add';
import { PatientAddSink } from './patient-add-sink';

describe('component:: patient-add', () => {
  let sinkContainer!: SinkContainer;

  beforeEach(() => {
    sinkContainer = createTestSinkContainer();
  });

  it('should mount', () => {
    const container = shallow(<PatientAdd />);
    expect(container.html()).toBeTruthy();
  });

  it('should display hospital when illness selected on desktop', () => {
    const sink = sinkContainer.getSink(PatientAddSink);
    const breakpoint = sinkContainer.getSink(BreakpointSink);
    breakpoint.deviceType = DeviceType.Desktop;
    sink.illness = { name: 'test', id: 1 };

    const container = shallow(<PatientAdd />);
    const sections = container.find(PatientAddSection);

    expect(sections.length).toEqual(2);
  });

  it('should display level of pain when illness and hospital selected', () => {
    const sink = sinkContainer.getSink(PatientAddSink);
    sink.illness = { name: 'test', id: 1 };
    sink.hospital = { name: 'test', id: 1, waitTime: 0 };

    const container = shallow(<PatientAdd />);
    const sections = container.find(PatientAddSubmit);

    expect(sections.length).toEqual(1);
  });
});
