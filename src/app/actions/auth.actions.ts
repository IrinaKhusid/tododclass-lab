import { createAction, props } from '@ngrx/store';

export const loginRequested = createAction(
  '[auth] login requested',
  props<{ username: string, password: string }>()
);

export const loginSucceeded = createAction(
  '[auth] login succeeded',
  props<{ username: string, token: string }>()
);

export const loginFailed = createAction(
  '[auth] login failed'
);

export const logOutRequested = createAction(
  '[auth] log out requested'
);
