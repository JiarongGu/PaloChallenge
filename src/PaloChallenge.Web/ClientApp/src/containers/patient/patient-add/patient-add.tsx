import { Spin } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { BreakpointSink } from '@sinks/common';
import { HospitalSink } from '@sinks/hospital/hospital-sink';
import { IllnessSink } from '@sinks/illness/illness-sink';
import { PatientAddSink } from './patient-add-sink';

import { DeviceType } from '@models/common';
import { PatientAddSection } from '../patient-add-section/patient-add-section';
import { PatientAddSubmit } from '../patient-add-submit/patient-add-submit';
import * as styles from './patient-add.module.scss';

export const PatientAdd = () => {
  const illness = useSink(IllnessSink);
  const hospital = useSink(HospitalSink);
  const patientAdd = useSink(PatientAddSink);
  const breakPoint = useSink(BreakpointSink, (sink) => [sink.deviceType]);

  React.useEffect(() => {
    patientAdd.reset();
  }, []);

  const selectionClasses = (toggle) =>
    classNames(styles.selection, {
      [styles.selectionSelected]: toggle
    });

  const isMobile = breakPoint.deviceType !== DeviceType.Desktop;

  const stage3 = patientAdd.hospital && patientAdd.illness;
  const stage2 = (!isMobile || !stage3) && patientAdd.illness;
  const stage1 = !isMobile || (!stage3 && !stage2);

  return (
    <Spin spinning={patientAdd.submitting}>
      <div className={styles.container}>
        {stage1 && (
          <PatientAddSection
            name={'Select an illness: '}
            onLoad={() => illness.load()}
            loading={illness.loading}
            models={illness.illnesses}
            selectionMapper={(model) => (
              <div
                key={model.id}
                className={selectionClasses(patientAdd.illness?.id === model.id)}
                onClick={() => (patientAdd.illness = model)}
              >
                {model.name}
              </div>
            )}
          />
        )}
        {stage2 && (
          <PatientAddSection
            name={'Our suggested Hospitals: '}
            onLoad={() => hospital.load()}
            loading={hospital.loading}
            models={hospital.hospitals}
            selectionMapper={(model) => (
              <div
                key={model.id}
                className={selectionClasses(patientAdd.hospital?.id === model.id)}
                onClick={() => (patientAdd.hospital = model)}
              >
                <div className={styles.hospital}>
                  <span>{model.name}</span> <span>Wait Time: {model.waitTime} mins</span>
                </div>
              </div>
            )}
          />
        )}

        {stage3 && (
          <PatientAddSubmit
            className={classNames(styles.section, styles.sectionFixed)}
            illness={patientAdd.illness!.name}
            hospital={patientAdd.hospital!.name}
            painLevel={patientAdd.painLevel}
            painLevelOnClick={(level) => (patientAdd.painLevel = level)}
            submitOnClick={patientAdd.submit}
            resetOnClick={patientAdd.reset}
            showReset={isMobile}
          />
        )}
      </div>
    </Spin>
  );
};
