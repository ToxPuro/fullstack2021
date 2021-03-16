import diagnosisData from '../../data/diagnosis.json';
import { DiagnoseEntry } from '../../types';

const getDiagnoses = (): Array<DiagnoseEntry>=> {
  return diagnosisData;
};

export default {
  getDiagnoses
};