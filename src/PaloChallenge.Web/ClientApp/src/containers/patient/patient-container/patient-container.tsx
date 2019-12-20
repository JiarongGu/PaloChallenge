import * as React from 'react';
import { useSink } from 'redux-sink';

import { RouteContent } from '@components/route-content';
import { LayoutSink } from '@sinks/common';
import { PatientMenu } from '../patient-menu/patient-menu';
import { patientRoute } from '../patient-route';

import * as styles from './patient-container.module.scss';

export const PatientContainer = () => {
  const layoutSink = useSink(LayoutSink, false);

  React.useEffect(() => {
    layoutSink.topMenu = PatientMenu;
    return () => {
      layoutSink.topMenu = undefined;
    };
  }, []);

  return (
    <div className={styles.container}>
      {(patientRoute.routes && <RouteContent routes={patientRoute.routes} />) || null}{' '}
    </div>
  );
};
