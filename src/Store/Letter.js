import { types, getRoot } from "mobx-state-tree";

import { generateId } from "../utils";

export const Letter = types.model("Letter", {
    id: types.optional(types.identifier, generateId),
    letter: types.refinement(types.string, str => str.length === 1),
    selected: types.optional(types.boolean, false)
})
.actions(self => ({

    toggle() {
        self.selected = !self.selected;
        const root = getRoot(self);
        if (self.selected) {
            root.addLetter(self);
        } else {
            root.removeLetter(self);
        }
    }

}));