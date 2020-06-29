import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../shared/services/http-error-handler.service';
import { applicationUrl } from '../../shared/enums/application-urls';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Error Handling portions are commented out
  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    // httpErrorHandler: HttpErrorHandler
    ) {
      // this.handleError = httpErrorHandler.createHandleError('UserDataService');
    }

  register(user: User) {
    return this.http.post<User>(applicationUrl.user.create, user, this.httpOptions);
    // .pipe(
    //   tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
    //   catchError(this.handleError<User>('register', user))
    // );
  }

  getUsers() {
    return this.http.get<any>(applicationUrl.user.readAll)
    .pipe(
      tap(_ => console.log('fetched Users')),
      // catchError(this.handleError('getUsers', []))
    );
  }

  deleteUser(user: User) {
    const id = user.id;
    const tempUrl = applicationUrl.user.delete + '?id=' + id;

    return this.http.delete<any>(tempUrl, this.httpOptions);
    // .pipe(
    //   tap((_) => console.log(`deleted user id=${id}`)),
    //   catchError(this.handleError<User>('deleteUser', user))
    //   );
  }

  getUser(userId: number) {
    const tempUrl = applicationUrl.user.readByID + '/' + userId;
    return this.http.get<User>(tempUrl);
    // .pipe(
    //   tap((_) => console.log(`fetched user id=${userId}`)),
    //   catchError(this.handleError<User>(`getUser id=${userId}`))
    // );
  }

  updateUser(user: User) {
    return this.http.put<any>(applicationUrl.user.update, user, this.httpOptions);
    // .pipe(
    //   tap((_) => console.log(`updated user id=${id}`)),
    //   catchError(this.handleError<any>('updateUser', user))
    // );
  }
}
