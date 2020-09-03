import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, selectIsLoggedIn, selectAuthToken } from '../reducers';
import { environment } from '../../environments/environment';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token;

  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(selectIsLoggedIn)
    ).subscribe(r => this.isLoggedIn = r);

    this.store.pipe(
      select(selectAuthToken)
    ).subscribe(r => this.token = r);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if the url is for our API and NOT for the authUrl
    if (req.url !== environment.authUrl) { // NOTE: consider using a approved-list of sites to send the token to.
      // then check to see if we are logged in. If we are, then add the token to the Authorization header and send that.
      if (this.isLoggedIn) {
        const newHeaders = req.headers.append('Authorization', 'Bearer ' + this.token);
        const authReq = req.clone({ headers: newHeaders });
        return next.handle(authReq);
      }
    } else {
      // otherwise, don't do anything.
      return next.handle(req);
    }
  }

}
