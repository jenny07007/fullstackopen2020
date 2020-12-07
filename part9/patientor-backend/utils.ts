/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Gender,
  NewPatientWithoutId,
  EntryType,
  newBaseEntry,
  Diagnose,
  HealthCheckRating,
  SickLeave,
  Discharge,
  newEntry,
} from "./types";

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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
  if (
    !date ||
    !isString(date) ||
    !isDate(date) ||
    !date.match(/^\d{4}[./-]\d{2}[./-]\d{2}$/g)
  ) {
    throw new Error(`Incorrect or missing date`);
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

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const prseEntryType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing entryType`);
  }
  return type;
};

const isArrayOfStrings = (code: any[]): code is string[] => {
  return code.every((c) => isString(c));
};

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnose["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnoses");
  }
  return diagnosisCodes;
};

const isHealthRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthRating = (rating: any): HealthCheckRating => {
  if (rating === null || rating === undefined || !isHealthRating(rating)) {
    throw new Error("Incorrect or missing healthRating");
  }
  return rating;
};

const parseSickLeave = (object: any): SickLeave => {
  if (!object) throw new Error("Incorrect or missing leave");
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error("Incorrect or missing discharge");
  return {
    date: parseDate(object.date),
    criteria: parseToString(object.criteria, "discharge criteria"),
  };
};

// end ---> helpers

const toNewBaseEntry = (object: any): newBaseEntry => {
  const newBaseEntry: newBaseEntry = {
    type: prseEntryType(object.type),
    description: parseToString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseToString(object.specialist, "specialist"),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

export const toNewEntry = (object: any): newEntry => {
  const newBaseEntry = toNewBaseEntry(object) as newEntry;

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthRating(object.healthCheckRating),
      };
    case EntryType.Hospital:
      return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
    case EntryType.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseToString(object.employerName, "employerName"),
      };
      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newEntry;
    default:
      return assertNever(newBaseEntry);
  }
};

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
