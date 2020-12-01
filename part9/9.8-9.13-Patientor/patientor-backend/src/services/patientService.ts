import patientsData from '../../data/patients.json';

import { Patient, NonSSNPatients } from '../../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

// const getPatients = ():Array<Patient> => {
//   return patients;
// }

// exclude the files we dont want to show
const getNonSSNPatients = (): NonSSNPatients[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addPatient = () => {
  return null;
};

export default { addPatient, getNonSSNPatients };