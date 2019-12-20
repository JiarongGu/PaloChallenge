import { Spin } from 'antd';
import * as React from 'react';

import * as styles from './patient-add-section.module.scss';

export interface PatientAddSectionProps<T> {
  name: string;
  models?: Array<T>;
  onLoad: () => void;
  loading: boolean;
  selectionMapper: (model: T) => JSX.Element;
}

export function PatientAddSection<T>({ name, models, loading, selectionMapper, onLoad }: PatientAddSectionProps<T>) {
  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={styles.container}>
        <h2>{name}</h2>
        {models && models.map(selectionMapper)}
      </div>
    </Spin>
  );
}
