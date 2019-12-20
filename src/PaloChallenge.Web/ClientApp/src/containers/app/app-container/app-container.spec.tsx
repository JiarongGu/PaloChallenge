
import { shallow } from 'enzyme';
import * as React from 'react';
import { SinkContainer } from 'redux-sink';

import { NavigationSink } from '@sinks/common';
import { createTestSinkContainer } from '@utils/create-test-sink-container';

import { AppHeaderMenu } from '../app-header-menu/app-header-menu';
import { AppContainer } from './app-container';

describe('component:: app-container', () => {
  let sinkContainer!: SinkContainer;

  beforeEach(() => {
    sinkContainer = createTestSinkContainer();
  });

  it('should mount', () => {
    const container = shallow(<AppContainer />);
    expect(container.html()).toBeTruthy();
  });

  it('should pass active keys to menu', () => {
    const sink = sinkContainer.getSink(NavigationSink);
    const activeKeys = ['test1', 'test2'];
    sink.activeRoute = { keys: activeKeys } as any;

    const container = shallow(<AppContainer />);
    const headerMenu = container.find(AppHeaderMenu).first();

    expect(headerMenu.prop('selectedKeys')).toEqual(activeKeys);
  });
});
