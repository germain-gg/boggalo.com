import { types, flow } from "mobx-state-tree";

import { Letter } from "./Letter";
import { Word } from "./Word";

import { shuffle, random, STATES } from "../utils";

export const App = types.model("App", {
    state: types.optional(
        types.refinement(types.string, val => STATES.includes(val)),
        "loading"
    ),
    matriceSize: types.optional(
        types.refinement(types.number, num => num === 3 || num === 4),
        3
    ),
    word: types.optional(types.string, ""),
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

    const afterCreate = () => (getWords(self.matriceSize));

    const getWords = flow(function*(matriceSize){
        self.state = "loading";
        const fileName = `${matriceSize * matriceSize}.json`;
        try {
            const response = yield fetch(fileName);
            const words = yield response.json();
            self.state = "ready";
            self.word = words[random(words.length)];

            const letters = self.word
                .split("")
                .map(letter => Letter.create({ letter }));
        
            self.shuffledWord = shuffle(letters);
        } catch (e) {
            self.state = "error";
        }
    });

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

    const setMatriceSize = matriceSize => {
        self.matriceSize = matriceSize;
        clearSelection();
        getWords(self.matriceSize);
    }

    return {
        afterCreate,
        addLetter,
        removeLetter,
        validateWord,
        clearSelection,
        setMatriceSize
    };
})
.views(self => ({

    get selectedWord() {
        return self.selectedLetters.map(({letter}) => letter).join("");
    }

}))