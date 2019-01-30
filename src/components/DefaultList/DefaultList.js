import React from "react";
import { Row } from "reactstrap";
import Logo from "../../WTlogo.png";
import "./DefaultList.css";
const DefaultList = props => {
  return (
    <div>
      {props.face === true ? (
        <Row>
          <img
            src={props.person.headshot.url || Logo}
            alt={props.person.firstName}
            style={{ width: "100%", height: "250px" }}
            onClick={() => props.guessCorrect(props.person.id)}
          />
          <div className={props.className}>
            <div>{props.person.firstName}</div>
            <div>{props.person.lastName}</div>
          </div>
          <div className={props.className}>
            <div>{props.person.firstName}</div>
            <div>{props.person.lastName}</div>
          </div>
        </Row>
      ) : (
        <Row>
          <div
            onClick={() => props.guessCorrect(props.person.id)}
            className={props.picClassName}
          >
            {props.person.firstName} {props.person.lastName}
          </div>
        </Row>
      )}
    </div>
  );
};

export default DefaultList;
