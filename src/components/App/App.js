import React, { Component } from "react";
import DefaultList from "../DefaultList/DefaultList";
import { Row, Container, Col } from "reactstrap";

import "./App.css";

class App extends Component {
  state = {
    people: [],
    selected: [],
    loading: true,
    correctIndex: null,
    correctPerson: {},
    guesses: [],
    correct: false,
    right: 0,
    wrong: 0
  };

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople = () => {
    fetch("https://willowtreeapps.com/api/v1.0/profiles/")
      .then(response => response.json())
      .then(people => {
        this.setState({ people }, () => {
          if (this.state.people.length) {
            this.getSelected();
          } else {
            this.fetchPeople();
          }
        });
      })
      .catch(err => console.log(err));
  };

  getSelected = () => {
    let selected = [];
    const correctIndex = Math.floor(Math.random() * 4);
    const startingIndex = Math.floor(
      Math.random() * (this.state.people.length - 5)
    );
    selected = this.state.people.slice(startingIndex, startingIndex + 5);
    this.setState({
      selected,
      correctIndex,
      correctPerson: selected[correctIndex],
      loading: false
    });
  };

  guessCorrect = id => {
    let guesses = this.state.guesses.slice();
    let right = this.state.right;
    let wrong = this.state.wrong;
    console.log(right++);
    guesses.push(id);
    if (id === this.state.correctPerson.id) {
      this.setState({ guesses, correct: true, right: right++ });
    } else {
      this.setState({ guesses, wrong: wrong++ });
    }
  };

  setClassName = id => {
    if (this.state.guesses.includes(id) && id === this.state.correctPerson.id) {
      return "correct";
    } else if (
      this.state.guesses.includes(id) &&
      id !== this.state.correctPerson.id
    ) {
      return "wrong";
    } else {
      return "";
    }
  };

  render() {
    console.log(this.state.wrong);
    return (
      <div className="App">
        <Container>
          {
            <div>
              Who is {this.state.correctPerson.firstName}{" "}
              {this.state.correctPerson.lastName}?
            </div>
          }
          <div>
            Right: {this.state.right} Wrong: {this.state.wrong}
          </div>
          <Row>
            {this.state.loading
              ? null
              : this.state.selected.map(person => {
                  return (
                    <Col key={person.id} style={{ margin: "10px" }}>
                      <DefaultList
                        person={person}
                        guessCorrect={this.guessCorrect}
                        guesses={this.state.guesses}
                        correctPerson={this.state.correctPerson}
                        className={this.setClassName(person.id)}
                      />
                    </Col>
                  );
                })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
