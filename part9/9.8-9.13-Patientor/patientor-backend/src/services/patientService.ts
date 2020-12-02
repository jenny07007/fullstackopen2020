import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.json';

import { Patient, NonSSNPatients, NewPatientWithoutId } from '../../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

// const getPatients = ():Array<Patient> => {
//   return patients;
// }

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

// exclude the files we dont want to show
const getNonSSNPatients = (): NonSSNPatients[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientWithoutId):Patient => {
  const idNum = uuidv4();
  const newPatient = {
    id: idNum.toString(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default { addPatient, getNonSSNPatients, findById };