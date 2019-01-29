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
    correct: false
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
    for (let i = startingIndex; i < startingIndex + 5; i++) {
      selected.push(this.state.people[i]);
    }
    this.setState({
      selected,
      correctIndex,
      correctPerson: selected[correctIndex],
      loading: false
    });
  };

  guessCorrect = id => {
    let guesses = this.state.guesses.slice();
    guesses.push(id);
    // console.log(guesses);
    // console.log(id === this.state.correctPerson.id);
    if (id === this.state.correctPerson.id) {
      this.setState({ guesses, correct: true });
    } else {
      this.setState({ guesses });
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
      return "hidden";
    }
  };

  render() {
    console.log(this.state.selected);
    console.log(this.state.correctPerson);
    return (
      <div className="App">
        <Container>
          {
            <div>
              Who is {this.state.correctPerson.firstName}
              {this.state.correctPerson.lastName}?
            </div>
          }
          {this.state.correct ? <div>Correct!</div> : null}
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
