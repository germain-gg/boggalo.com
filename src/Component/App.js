import React, { Component } from 'react';

export class App extends Component {
  render() {
    const { word, shuffledWord, selectedLetters } = this.props.store;
    return (
      <>
        <h1>{word}</h1>

        <div className="grid">
          {shuffledWord.map(({ id, toggle, selected, letter }) => (
            <div key={id} className="letter" onClick={toggle} data-selected={selected}>
              {letter}
            </div>
          ))}
        </div>

        { selectedLetters.map(({letter}) => letter) }
      </>
    );
  }
};
