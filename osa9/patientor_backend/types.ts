export type DiagnoseEntry = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Nonbinary = 'nonbinary'
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};



export type NewPatient = Omit<Patient, 'id'>;
export type NoSsnPatient = Omit<Patient, 'ssn'>;