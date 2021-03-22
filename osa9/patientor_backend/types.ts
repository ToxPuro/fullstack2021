export type DiagnoseEntry = {
  code: string;
  name: string;
  latin?: string;
};

type sickLeave = {
  startDate: string;
  endDate: string;
}

export type discharge = {
  date: string;
  criteria: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}
export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export type NewEntry = Omit<Entry, 'id'>;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};



export type NewPatient = Omit<Patient, 'id'>;
export type NoSsnPatient = Omit<Patient, 'ssn' | 'entries'>;