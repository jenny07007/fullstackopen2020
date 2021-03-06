import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Icon, Card } from "semantic-ui-react";
import { renderdiagnosesCode } from "../utils";
import { useStateValue } from "../state";

const OccupationalHealthcareDetails: React.FC<{
  oh: OccupationalHealthcareEntry;
}> = ({ oh }) => {
  const [{ diagnoses }] = useStateValue();

  const renderSickLeave = () => (
    <Card.Description>
      <Card.Meta style={{ color: "purple" }}>
        Start: {oh.sickLeave?.startDate}
      </Card.Meta>
      <Card.Meta style={{ color: "purple" }}>
        End: {oh.sickLeave?.endDate}
      </Card.Meta>
    </Card.Description>
  );

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>
            {oh.date}
            <Icon name="fork" />
            {oh.employerName}
          </Card.Header>
          <Card.Description>{oh.description}</Card.Description>
          {/*check diagnosisCodes*/}
          {oh.diagnosisCodes && (
            <Card.Description style={{ fontWeight: "bold", marginTop: "10px" }}>
              Diagnosis Codes
            </Card.Description>
          )}
          {oh.diagnosisCodes?.map((code) => (
            <Card key={code} style={{ padding: "5px 5px" }}>
              <Card.Description>
                {renderdiagnosesCode(diagnoses, code)}
              </Card.Description>
            </Card>
          ))}
          {/*check sickLeave*/}
          {oh.sickLeave && renderSickLeave()}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default OccupationalHealthcareDetails;
