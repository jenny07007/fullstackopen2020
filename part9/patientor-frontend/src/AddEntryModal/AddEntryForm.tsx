import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { EntryType, newEntry } from "../types";
import { isDate } from "../utils";
import {
  DiagnosisSelection,
  SelectTypeField,
  TextField,
  TypeOptions,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import EntryTypeField from "./EntryTypeField";

interface Props {
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const typeOptions: TypeOptions[] = [
    { value: EntryType.HealthCheck, label: "HealthCheck" },
    { value: EntryType.Hospital, label: "Hospital" },
    {
      value: EntryType.OccupationalHealthCare,
      label: "OccupationalHealthCare",
    },
  ];

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
        type: EntryType.HealthCheck,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors:
          | { [field: string]: string }
          | {
              [key: string]: {
                [key: string]: string;
              };
            } = {};
        if (!isDate(values.date)) {
          errors.date = "Please provide the date in YYYY-MM-DD formate";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (
          (values.type === EntryType.OccupationalHealthCare &&
            !values.sickLeave.startDate) ||
          (values.type === EntryType.OccupationalHealthCare &&
            !isDate(values.sickLeave.startDate)) ||
          (values.type === EntryType.OccupationalHealthCare &&
            !values.sickLeave.endDate) ||
          (values.type === EntryType.OccupationalHealthCare &&
            !isDate(values.sickLeave.endDate))
        ) {
          errors = {
            ...errors,
            sickLeave: {
              endDate: "Please provide the date in YYYY-MM-DD formate",
            },
          };
        }
        if (
          (values.type === EntryType.Hospital && !values.discharge.date) ||
          (values.type === EntryType.Hospital && !isDate(values.discharge.date))
        ) {
          errors = {
            ...errors,
            discharge: {
              date: "Please provide the date in YYYY-MM-DD formate",
            },
          };
        }
        if (values.type === EntryType.Hospital && !values.discharge.criteria) {
          errors = {
            ...errors,
            discharge: {
              criteria: requiredError,
            },
          };
        }
        if (
          values.type === EntryType.OccupationalHealthCare &&
          !values.employerName
        ) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectTypeField
              name="type"
              label="Type (required)"
              options={typeOptions}
            />

            <Field
              label="Date (required)"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <Field
              label="Specialist (required)"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description (required)"
              placeholder="Description"
              name="description"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <EntryTypeField entryType={values.type} />

            <Grid style={{ marginTop: "10px" }}>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancle
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
