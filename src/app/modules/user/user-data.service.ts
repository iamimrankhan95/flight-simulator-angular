import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../core/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public url = 'http://192.168.101.41:9050/cms_login'; // URL to web api
  private handleError: HandleError;

  constructor(
    private router: Router,
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
    ) {
      this.handleError = httpErrorHandler.createHandleError('UserDataService');
    }

  register(user: User) {
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('register', user))
    );
  }

  getUsers() {
    return this.http.get<any>(this.url).pipe(
      tap(_ => console.log('fetched Users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  deleteUser(user: User) {
    const id = user.id;
    const tempUrl = this.url + '/' + id;
    return this.http.delete<User>(tempUrl, this.httpOptions).pipe(
      tap((_) => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser', user))
      );
  }

  getUser(userId: number) {
    const tempUrl = this.url + '/' + userId;
    return this.http.get<User>(tempUrl).pipe(
      tap((_) => console.log(`fetched user id=${userId}`)),
      catchError(this.handleError<User>(`getUser id=${userId}`))
    );
  }

  updateUser(user: User, id: number) {
    const tempUrl = this.url + '/' + id;
    return this.http.put<User>(tempUrl, user, this.httpOptions).pipe(
      tap((_) => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateUser', user))
    );
  }
}
