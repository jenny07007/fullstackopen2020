import { Gender, Patient, Entry } from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseToString = (text: any, paramName: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${paramName}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing dateOfBirth`);
  }
  return date;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender`);
  }
  return gender;
};

export const toPatient = (object: any): Patient => {
  const newPatient: Patient = {
    name: parseToString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseToString(object.ssn, "ssn"),
    occupation: parseToString(object.occupation, "occupation"),
    gender: parseGender(object.gender),
    id: parseToString(object.id, "id"),
    entries: object.entries,
  };
  return newPatient;
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/**
 * Helper function for renderdiagnosesCode
 */
export const renderdiagnosesCode = (diagnoses: {}, code: string) => {
  const codeArray = Object.values(diagnoses).map((d: any) => {
    if (d.code === code) {
      return `${code} - ${d.name}`;
    }
  });
  return codeArray;
};
