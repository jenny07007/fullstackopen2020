import { Gender, NewPatientWithoutId } from "./types";

// -start ---> helpers
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

// end ---> helpers

// receives the request body as a parameter and
// returns a properly typed NewPatientWithoutId object
const toNewPatient = (object: any): NewPatientWithoutId => {
  const newPatient: NewPatientWithoutId = {
    name: parseToString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseToString(object.ssn, "ssn"),
    occupation: parseToString(object.occupation, "occupation"),
    gender: parseGender(object.gender),
  };
  return newPatient;
};

export default toNewPatient;
