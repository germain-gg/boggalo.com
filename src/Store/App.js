import { types } from "mobx-state-tree";

import { Letter } from "./Letter";
import { Word } from "./Word";

import { shuffle } from "../utils";

export const App = types.model("App", {
    word: types.string,
    shuffledWord: types.optional(
        types.array(Letter),
        []
    ),
    selectedLetters: types.optional(
        types.array(types.reference(Letter)),
        []
    ),
    submittedWords: types.optional(
        types.array(Word),
        []
    )
})
.actions(self => {

    const afterCreate = () => {
        const letters = self.word
            .split("")
            .map(letter => Letter.create({ letter }));
        self.shuffledWord = shuffle(letters);
    };

    const addLetter = (letter) => {
        self.selectedLetters.push(letter.id);
    };

    const removeLetter = ({ id }) => {
        self.selectedLetters = self.selectedLetters.filter(letter => letter.id !== id);
    };

    const clearSelection = () => {
        self.selectedLetters.forEach(({ toggle }) => toggle());
    }

    const validateWord = () => {
        self.submittedWords.push({ word: self.selectedWord });
        self.clearSelection();
    };

    return {
        afterCreate,
        addLetter,
        removeLetter,
        validateWord,
        clearSelection
    };
})
.views(self => ({

    get selectedWord() {
        return self.selectedLetters.map(({letter}) => letter).join("");
    }

}))