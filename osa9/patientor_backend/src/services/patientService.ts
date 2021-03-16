import Patients from '../../data/patients';
import { NoSsnPatient, NewPatient, Patient, Gender } from '../../types';
import { v1 as uuid} from 'uuid';

const getNoSnnPatients = (): Array<NoSsnPatient>=> {
  return Patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  Patients.push(newPatient);
  return newPatient;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string =>  {
  if(!string || !isString(string)){
    throw new Error('Incorrect parameters ' + string);
  }
  return string;
};

const isDateOfBirth = (dateOfBirth: string): boolean => {
  const rex = /\d{4}-\d{2}-\d{2}/;
  return rex.test(dateOfBirth);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if(!dateOfBirth || !isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)){
    throw new Error('dateOfBirth incorrect ' + dateOfBirth );
  }
  return dateOfBirth;
};

const isSNN = (ssn: string ): boolean => {
  const snnMap = new Map([
    [0, "0"],  [1, "1"],
    [2, "2"],  [3, "3"],
    [4, "4"],  [5, "5"],
    [6, "6"],  [7, "7"],
    [8, "8"],  [9, "9"],
    [10, "A"], [11, "B"],
    [12, "C"], [13, "D"],
    [14, "E"], [15, "F"],
    [16, "H"], [17, "J"],
    [18, "K"], [19, "L"],
    [20, "M"], [21, "N"],
    [22, "P"], [23, "R"],
    [24, "S"], [25, "T"],
    [26, "U"], [27, "V"],
    [28, "W"], [29, "X"],
    [30, "Y"] 
  ]); 

  const rex = /\d{6}[-+A]\d{3}./;
  if(!rex.test(ssn)) return false;
  const digits = ssn.match(/\d+/g);
  if(digits===null) return false;
  const digit = Number(digits.reduce((prev, curr) => prev+curr));
  const remainder = digit%31;
  const check = snnMap.get(remainder);
  if(check !== ssn.charAt(ssn.length-1)) return false; 
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseSNN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn) || !isSNN(ssn)){
    throw new Error('Social security number is incorrect' + ssn);
  }
  return ssn; 
};

const parseGender = (gender: unknown): Gender=> {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender '+ gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const NewPatientEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSNN(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
  return NewPatientEntry;
};

export default {
  getNoSnnPatients,
  addPatient,
  toNewPatientEntry
};