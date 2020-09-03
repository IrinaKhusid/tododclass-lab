import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/todos.reducer';

export const todoItemSorted = createAction(
  '[todo] todo item sorted',
  props<{ id: string, previousIndex: number, currentIndex: number }>()
);

let tempId = 0;
export const todoAdded = createAction(
  '[todo] todo item added',
  ({ name, project, dueDate }: { name: string, project: string, dueDate: string }) => ({

    payload: {
      id: 'TEMP' + tempId++,
      name,
      project,
      dueDate
    } as TodoEntity
  })
);

export const todoAddedSucceeded = createAction(
  '[todo] todo added succeeded',
  props<{ oldId: string, payload: TodoEntity }>()
);

export const todoAddedFailed = createAction(
  '[todo] todo added failed',
  props<{ payload: TodoEntity, message: string }>()
);

export const loadTodos = createAction(
  '[todos] load todos'
);

export const loadTodosSucceeded = createAction(
  '[todos] load todos succeeded',
  props<{ todos: TodoEntity[] }>()
);

export const loadTodosFailed = createAction(
  '[todos] loading todos failed',
  props<{ error: string }>()
);


