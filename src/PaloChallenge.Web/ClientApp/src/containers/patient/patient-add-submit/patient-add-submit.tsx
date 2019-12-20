import { Button, Icon } from 'antd';
import * as React from 'react';

import * as styles from './patient-add-submit.module.scss';

export interface PatientAddSubmitProps {
  illness: string;
  hospital: string;
  painLevel?: number;
  painLevelOnClick: (level: number) => void;
  submitOnClick: () => void;
  resetOnClick: () => void;
  className?: string;
  showReset: boolean;
}

export const PatientAddSubmit: React.FunctionComponent<PatientAddSubmitProps> = ({
  illness,
  hospital,
  painLevel,
  painLevelOnClick,
  submitOnClick,
  resetOnClick,
  className,
  showReset
}) => {
  return (
    <div className={className}>
      <div className={styles.group}>
        <h2>Illness:</h2>
        <p>{illness}</p>
      </div>
      <div className={styles.group}>
        <h3>Hospital:</h3>
        <p>{hospital}</p>
      </div>
      <div className={styles.group}>
        <h3>Select severity level: {painLevel}</h3>
        <div className={styles.iconContainer}>
          <Icon className={styles.icon0} type={'smile'} rotate={180} onClick={() => painLevelOnClick(0)} />
          <Icon className={styles.icon1} type={'smile'} onClick={() => painLevelOnClick(1)} />
          <Icon className={styles.icon2} type={'meh'} onClick={() => painLevelOnClick(2)} />
          <Icon className={styles.icon3} type={'frown'} onClick={() => painLevelOnClick(3)} />
          <Icon className={styles.icon4} type={'frown'} rotate={180} onClick={() => painLevelOnClick(4)} />
        </div>
      </div>
      <div className={styles.button}>
        <Button type={'primary'} onClick={submitOnClick} disabled={painLevel === undefined}>
          Submit
        </Button>
        {showReset && (
          <Button type={'danger'} onClick={resetOnClick}>
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
