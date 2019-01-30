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
    wrong: 0,
    face: true
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
            this.playNormal();
          } else {
            this.fetchPeople();
          }
        });
      })
      .catch(err => console.log(err));
  };

  // takes in an array of people ie state.people or mats and grabs 5 and sets to selected
  getSelected = peopleArr => {
    this.setState({
      selected: [],
      loading: true,
      correctIndex: null,
      correctPerson: {},
      guesses: [],
      correct: false
    });
    const correctIndex = Math.floor(Math.random() * 4);
    const startingIndex = Math.floor(Math.random() * (peopleArr.length - 5));
    const selected = peopleArr.slice(startingIndex, startingIndex + 5);
    this.setState({
      selected,
      correctIndex,
      correctPerson: selected[correctIndex],
      loading: false
    });
  };

  playNormal = () => {
    // normal mode with all employees
    this.getSelected(this.state.people);
  };

  getMats = () => {
    // just the mats
    const mats = this.state.people.filter(person => {
      return person.firstName.toLowerCase().includes("mat");
    });
    this.getSelected(mats);
  };

  guessCorrect = id => {
    let guesses = this.state.guesses.slice();
    guesses.push(id);
    if (id === this.state.correctPerson.id) {
      this.setState(prevState => {
        return { guesses, correct: true, right: prevState.right + 1 };
      });
    } else {
      this.setState(prevState => {
        return { guesses, wrong: prevState.wrong + 1 };
      });
    }
  };

  toggleFaceGame = () => {
    this.setState({
      face: !this.state.face
    });
  };

  setClassName = id => {
    // after you click, it will change the color
    if (this.state.guesses.includes(id) && id === this.state.correctPerson.id) {
      return "pic correct";
    } else if (
      this.state.guesses.includes(id) &&
      id !== this.state.correctPerson.id
    ) {
      return "pic wrong";
    }
    return "hidden";
  };

  picClassName = id => {
    if (this.state.guesses.includes(id) && id === this.state.correctPerson.id) {
      return "pic correct";
    } else if (
      this.state.guesses.includes(id) &&
      id !== this.state.correctPerson.id
    ) {
      return "pic wrong";
    }
  };

  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    } else {
      return (
        <div className="App">
          <Container>
            <button onClick={this.playNormal}>Play</button>
            <button onClick={this.getMats}>Mat(s)</button>
            <button onClick={this.toggleFaceGame}>Name or Face</button>
            <div>
              Right: {this.state.right} Wrong: {this.state.wrong}
            </div>
            {this.state.face === true ? (
              <div>
                Who is {this.state.correctPerson.firstName}{" "}
                {this.state.correctPerson.lastName}?
              </div>
            ) : (
              <div>
                <img
                  src={
                    this.state.selected[this.state.correctIndex].headshot.url
                  }
                  style={{ height: "250px" }}
                />
              </div>
            )}

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
                          picClassName={this.picClassName(person.id)}
                          face={this.state.face}
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
}

export default App;
