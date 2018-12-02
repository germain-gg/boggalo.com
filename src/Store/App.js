import { types } from "mobx-state-tree";

import { shuffle } from "../utils";

export const App = types.model({
    word: types.string,
    selectedLetters: types.maybe(
        types.array(
            types.refinement(types.string, str => str.length === 1)
        ),
        []
    )
})
.views(self => ({
    
    get shuffledLetters() {
        const letters = self.word.split("");
        return shuffle(letters);
    }

}))
.actions(self => ({
    
}));