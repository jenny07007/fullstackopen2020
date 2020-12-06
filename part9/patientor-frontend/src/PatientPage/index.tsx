import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { toPatient } from "../utils";

import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal/index";

const genderIcons = {
  male: "mars" as "mars",
  female: "venus" as "venus",
  other: "genderless" as "genderless",
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  let patient = patients[id];

  const [modal, setModal] = React.useState<boolean>(false);

  const openModal = (): void => setModal(true);
  const closeModal = (): void => setModal(false);
  // eslint-disable-next-line
  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  try {
    patient = toPatient({ ...patient });
  } catch (e) {
    console.log(e.message);
  }

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchPatient();
  }, [id, dispatch]);

  return !patient ? null : (
    <div>
      <h1>
        {patient.name} <Icon name={genderIcons[patient.gender]} />
      </h1>
      <p>SSN: {patient.ssn}</p>
      <p>Occuption: {patient.occupation}</p>
      {patient.entries?.length !== 0 && <h2>Entries</h2>}
      {patient.entries &&
        patient.entries.map((p) => (
          <div key={p.id}>
            <EntryDetails entry={p} />
          </div>
        ))}
      <div style={{ marginTop: "30px" }}>
        <AddEntryModal modal={modal} onClose={closeModal} onSubmit={onSubmit} />
        <Button onClick={openModal}>Add Entry</Button>
      </div>
    </div>
  );
};

export default PatientPage;
