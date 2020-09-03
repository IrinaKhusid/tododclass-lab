import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthEffects {

  loginSucceded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSucceeded),
      tap(() => this.router.navigate(['dashboard']))
    ), { dispatch: false });

  logOutRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logOutRequested),
      tap(() => this.router.navigate(['login']))
    ), { dispatch: false });

  // loginRequested -> login at api -> (loginSucceeded | loginFailure)
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      switchMap((action) => this.client.post<{ access_token: string }>(environment.authUrl, {
        username: action.username,
        password: action.password
      }).pipe(
        tap(r => localStorage.setItem('auth_token', r.access_token)),
        map(r => authActions.loginSucceeded({ username: action.username, token: r.access_token })),
        catchError(err => of(authActions.loginFailed()))
      )
      )
    )
  );

  constructor(private actions$: Actions, private client: HttpClient, private router: Router) { }
}
