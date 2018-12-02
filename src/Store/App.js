import { types, onAction } from "mobx-state-tree";

import { Letter } from "./Letter";

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
    )
})
.actions(self => ({
    
    afterCreate() {
        const letters = self.word
            .split("")
            .map(letter => Letter.create({ letter }));
        self.shuffledWord = shuffle(letters);
    },

    addLetter(letter) {
        self.selectedLetters.push(letter.id);
    },

    removeLetter({ id }) {
        self.selectedLetters = self.selectedLetters.filter(letter => letter.id !== id);
    }

}))
.views(self => ({


}));