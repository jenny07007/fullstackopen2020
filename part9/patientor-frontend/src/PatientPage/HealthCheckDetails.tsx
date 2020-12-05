import React from "react";
import { HealthCheckEntry } from "../types";
import { Icon, Card } from "semantic-ui-react";

const HealthCheckDetails: React.FC<{ healthEntry: HealthCheckEntry }> = ({
  healthEntry,
}) => {
  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Card.Header>
            {healthEntry.date}
            <Icon name="user md" />
          </Card.Header>

          <Card.Description>{healthEntry.description}</Card.Description>
          {/*check healthCheckRating*/}
          {healthEntry.healthCheckRating === 0 ? (
            <Card.Content textAlign="right">
              <Icon name="heart" color="green" />
            </Card.Content>
          ) : (
            <Card.Content textAlign="right">
              <Icon name="heartbeat" color="yellow" />
            </Card.Content>
          )}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default HealthCheckDetails;
