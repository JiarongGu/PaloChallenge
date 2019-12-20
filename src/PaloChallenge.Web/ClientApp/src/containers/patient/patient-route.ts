import { RouteModel } from '@models/common';
import { PatientAdd } from './patient-add/patient-add';
import { PatientContainer } from './patient-container/patient-container';

export const patientRoute: RouteModel = {
  key: 'patient',
  link: {
    name: 'Patient',
    icon: 'user',
    url: '/patient',
  },
  config: {
    path: '/patient',
    component: PatientContainer
  },
  routes: [
    {
      key: 'patient.add',
      link: { name: 'Add Patient', url: '/patient' },
      config: {
        path: '/patient',
        exact: true,
        component: PatientAdd
      }
    }
  ]
};
