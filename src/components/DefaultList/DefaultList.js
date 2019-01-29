import React from "react";
import { Row } from "reactstrap";
import Logo from "../../WTlogo.png";
import "./DefaultList.css";
const DefaultList = props => {
  return (
    <Row>
      <img
        src={props.person.headshot.url || Logo}
        alt={props.person.firstName}
        style={{ width: "100%", height: "250px" }}
        onClick={() => props.guessCorrect(props.person.id)}
      />
      {props.person.firstName}
      <div className={props.className}>
        <div>{props.person.firstName}</div>
        <div>{props.person.lastName}</div>
      </div>
    </Row>
  );
};

export default DefaultList;
