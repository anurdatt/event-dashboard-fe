import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';

import { delay, dematerialize, materialize } from 'rxjs/operators';

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User' },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User' }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handleRoute(request, next);
  }

  handleRoute(request: HttpRequest<unknown>, next: HttpHandler)
    : Observable<HttpEvent<unknown>>
  {
    const {url, method, headers} = request;
    const body:any = request.body;
    switch (true) {
      case url.endsWith('/users/authenticate') && method === 'POST':
        return authenticate();

      case url.endsWith('/users') && method === 'GET':
        return getUsers();
      
        // pass through any requests not handled above
      default:
        return next.handle(request);
    }

    // route functions
    function authenticate(): Observable<HttpEvent<unknown>> {
      const { username, password } = body;
      const user = users.find(x => x.username === username);
      if (user) {
        if (user.password === password) {
          return ok({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: `fake-jwt-token.${user.id}`
          });
        } else {
          return error('Invalid Password!');
        }
      } else {
        return error('User not found!');
      }
      
    }
    
    function getUsers(): Observable<HttpEvent<unknown>> {
      if (!isLoggedIn()) return unauthorized();

      return ok(users);
    }


    // helper functions
    function ok(body: unknown): Observable<HttpEvent<unknown>> {
      return of(new HttpResponse({status: 200, body}))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function unauthorized(): Observable<HttpEvent<unknown>> {
      return throwError({ status: 401, error: { message: "Request not authorized!" } })
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function error(message: string): Observable<HttpEvent<unknown>> {
      return throwError({ status: 400, error: { message } })
        .pipe(materialize(), delay(500), dematerialize());
    }

    function isLoggedIn(): boolean {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

  }


}


export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};