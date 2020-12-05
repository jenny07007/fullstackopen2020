import React from "react";
import { Entry } from "../types";
import HealthCheckDetails from "./HealthCheckDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";
import HospitalDetails from "./HospitalDetails";
import { assertNever } from "../utils";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  // console.log(entry);
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails healthEntry={entry} />;
    case "Hospital":
      return <HospitalDetails hd={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails oh={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
