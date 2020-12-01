import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../../types';

const diagonses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagonses;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addDiagnose = () => {
  return null;
};

export default { getDiagnoses, addDiagnose };