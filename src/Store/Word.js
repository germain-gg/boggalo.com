import { types } from "mobx-state-tree";

export const Word = types.model("Word", {
    word: types.identifier,
    description: types.maybe(types.string),
    length: types.optional(
        types.refinement(types.number, val => val >= 0),
        0
    )
})
.actions(self => {

    const afterCreate = () => {
        self.length = self.word.length;
    };

    return {
        afterCreate
    }
});