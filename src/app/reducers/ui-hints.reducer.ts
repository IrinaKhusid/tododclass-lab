import { createReducer, on, Action } from '@ngrx/store';
import * as actions from '../actions/todo.actions';
export interface UiHintsState {
  inboxSort: string[];
}

const initialState: UiHintsState = {
  inboxSort: []
};

const reducerFunction = createReducer(
  initialState,
  on(actions.todoAddedSucceeded, (state, action) => {
    if (!action.payload.project) {
      return ({ ...state, inboxSort: replaceIdWithNewId(state.inboxSort, action.oldId, action.payload.id) });
    } else {
      return state;
    }
  }),
  on(actions.loadTodosSucceeded, (state, action) => {
    const ids = action.todos
      .filter(t => !t.project)
      .map(t => t.id);

    return ({ ...state, inboxSort: ids }); // sort them in the order they come from the api
  }),
  on(actions.todoItemSorted, (state, action) => {
    const newSort = move(state.inboxSort, action.previousIndex, action.currentIndex);
    return { ...state, inboxSort: newSort };
  }),
  on(actions.todoAdded, (state, action) => {
    if (!action.payload.project) {
      return ({ ...state, inboxSort: [action.payload.id, ...state.inboxSort] });
    } else {
      return state;
    }
  })
);

function replaceIdWithNewId(array: string[], oldId: string, newId: string): string[] {
  const idx = array.indexOf(oldId);
  const newSort = Object.assign([], array, { [idx]: newId });
  return newSort;
}

export function reducer(state: UiHintsState, action: Action): UiHintsState {
  return reducerFunction(state, action);
}


function move<T>(arr: T[], oldIndex: number, newIndex: number): T[] {
  arr = [...arr];
  while (oldIndex < 0) {
    oldIndex += arr.length;
  }
  while (newIndex < 0) {
    newIndex += arr.length;
  }
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length;
    while ((k--) + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
}
