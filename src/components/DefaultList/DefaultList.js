import React from "react";
import { Row } from "reactstrap";
const DefaultList = props => {
  return (
    <Row>
      <img
        src={props.person.headshot.url}
        alt={props.person.firstName}
        style={{ width: "100%", height: "250px" }}
        onClick={() => props.guessWinner(props.person.id)}
      />
      {props.person.firstName}
    </Row>
  );
};

export default DefaultList;
