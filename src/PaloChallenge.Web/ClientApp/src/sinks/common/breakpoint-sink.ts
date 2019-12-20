import * as _ from 'lodash';
import { effect, sink, SinkFactory, state } from 'redux-sink';

import { DeviceType } from '@models/common';

@sink('break-point')
export class BreakpointSink {
  public static load = (window: Window) => {
    const breakpointSink = SinkFactory.getSink(BreakpointSink);
    const update = _.debounce(() => breakpointSink.update(window.innerHeight, window.innerWidth), 100);
    window.addEventListener('resize', update);
    update();
  }

  @state public size!: { height: number; width: number };
  @state public deviceType: DeviceType;

  @effect
  public update(height: number, width: number) {
    this.size = { height, width };
    this.deviceType = this.getDeviceType(width);
  }

  private getDeviceType(width: number) {
    if (width < 768) {
      return DeviceType.Mobile;
    } else if (width < 1024) {
      return DeviceType.Tablet;
    }
    return DeviceType.Desktop;
  }
}
