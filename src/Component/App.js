import React, { Component } from 'react';

import { BoggleBoard, ResultBoard, Letter } from "../Style/Styled";

export class App extends Component {
  render() {
    const { shuffledWord, selectedLetters, validateWord, clearSelection, submittedWords, matriceSize, setMatriceSize, isLoading } = this.props.store;
    return (
      <>
        <h1>Boggalo</h1>

        <hr/>

        <center>
          Board size
          <select defaultValue="3" onChange={evt => setMatriceSize(parseInt(evt.target.value))}>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </center>

        <hr/>


        <BoggleBoard size={matriceSize}>
          {shuffledWord.map(({ id, toggle, selected, letter }) => (
            <Letter key={id} onClick={toggle} selected={selected}>
              {letter}
            </Letter>
          ))}
        </BoggleBoard>

        <ResultBoard>
          {selectedLetters.map(({ id, letter, toggle }) => (
            <Letter key={id} onClick={toggle}>
              {letter}
            </Letter>
          ))}

          { selectedLetters.length >= 2 && (
            <Letter onClick={validateWord}>
              <span role="img" aria-label="Green tick">✅</span>
            </Letter>
          )}
          { selectedLetters.length >= 1 && (
            <Letter onClick={clearSelection}>
              <span role="img" aria-label="Stop sign">⛔️</span>
            </Letter>
          )}
        </ResultBoard>

        <hr/>

        <table>
          <thead>
            <tr>
              <th>
                Word
              </th>
              <th>
                Length
              </th>
              <th>
                Exists
              </th>
              <th>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            { submittedWords.map(({word, length, description, isLoading, exists}) => (
              <tr key={word}>
                <td>
                  {word}
                </td>
                <td>
                  {length}
                </td>
                <td>
                  { !isLoading ? (exists ? "✅" : "⛔️") : "⏳"}
                </td>
                <td>
                  { !isLoading ? description : "⏳"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </>
    );
  }
};
