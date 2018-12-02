import React, { Component } from 'react';

export class App extends Component {
  render() {
    return (
      <>
        <h1>{this.props.store.word}</h1>
        <h2>{this.props.store.shuffledLetters}</h2>
      </>
    );
  }
};
