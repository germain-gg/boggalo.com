import { types, flow } from "mobx-state-tree";

import { STATES, getDefinitions } from "../utils";

export const Word = types.model("Word", {
    word: types.identifier,
    state: types.optional(
        types.refinement(types.string, val => STATES.includes(val)),
        "loading"
    ),
    description: types.maybe(types.string),
    length: types.optional(
        types.refinement(types.number, val => val >= 0),
        0
    )
})
.views(self => ({

    get exists() {
        return this.state === "ready";
    },
    
    get isLoading() {
        return this.state === "loading";
    }
    
}))
.actions(self => {

    const afterCreate = () => {
        self.length = self.word.length;
        getWordEntry();
    };

    const getWordEntry = flow(function*() {
        try {
            const definitions = yield getDefinitions(self.word);
            self.state = "ready";
        } catch (e) {
            self.state = "error";
        }
    });

    return {
        afterCreate,
        getWordEntry
    }
});