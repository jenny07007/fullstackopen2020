export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NonSSNPatients = Omit<Patient, "ssn">;
export type NewPatientWithoutId = Omit<Patient, "id">;