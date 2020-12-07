import React from "react";
import { Field } from "formik";
import { EntryType } from "../types";
import { NumberField, TextField } from "../AddPatientModal/FormField";

interface Props {
  entryType: EntryType;
}

const EntryTypeField: React.FC<Props> = ({ entryType }) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case EntryType.Hospital:
      return (
        <div
          style={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "10px",
          }}
        >
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </div>
      );
    case EntryType.OccupationalHealthCare:
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "10px",
          }}
        >
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <div style={{ width: "100%" }}>
            <Field
              label="SickLeave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default EntryTypeField;
