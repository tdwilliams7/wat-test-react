import React, { Component } from "react";
import DefaultList from "../DefaultList/DefaultList";

import "./App.css";

class App extends Component {
  state = {
    people: [],
    selected: [],
    loading: true
  };

  componentDidMount() {
    fetch("https://willowtreeapps.com/api/v1.0/profiles/")
      .then(response => response.json())
      .then(people => {
        this.setState({ people }, () => {
          this.getFive();
        });
      })
      .catch(err => console.log(err));
  }

  getFive = () => {
    let selected = [];
    const startingIndex =
      Math.floor(Math.random() * this.state.people.length) - 5;
    for (let i = startingIndex; i < startingIndex + 5; i++) {
      selected.push(this.state.people[i]);
    }
    this.setState({ selected, loading: false });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {this.state.loading
          ? null
          : this.state.selected.map(person => {
              return <DefaultList key={person.id} person={person} />;
            })}
      </div>
    );
  }
}

export default App;
