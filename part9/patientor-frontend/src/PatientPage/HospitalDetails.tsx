import React from "react";
import { HospitalEntry } from "../types";
import { Icon, Card } from "semantic-ui-react";
import { useStateValue } from "../state";
import { renderdiagnosesCode } from "../utils";

const HospitalDetails: React.FC<{ hd: HospitalEntry }> = ({ hd }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>
            {hd.date}
            <Icon name="user md" />
          </Card.Header>
          <Card.Description>{hd.description}</Card.Description>
          {/*check diagnosisCodes*/}
          {hd.diagnosisCodes && (
            <Card.Description style={{ fontWeight: "bold", marginTop: "10px" }}>
              Diagnosis Codes
            </Card.Description>
          )}
          {hd.diagnosisCodes?.map((code) => (
            <Card key={code} style={{ padding: "5px 5px" }}>
              <Card.Description>
                {renderdiagnosesCode(diagnoses, code)}
              </Card.Description>
            </Card>
          ))}
          {/*check discharge*/}
          {hd.discharge && (
            <Card.Content>
              <Card.Description>{hd.discharge.criteria}</Card.Description>
              <Card.Description>{hd.discharge.date}</Card.Description>
            </Card.Content>
          )}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HospitalDetails;
