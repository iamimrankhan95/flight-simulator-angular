import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { applicationUrl } from '../../shared/enums/application-urls';
import { tap, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private authToken;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    // this.currentUserSubject =  new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // comment out the line above and remove the one below when api sends response
    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('currentUser')
    );
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credential: any) {
    return this.http.post<any>(applicationUrl.auth.login, credential).pipe(
      tap((response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        localStorage.setItem('loggedInUserToken', response.accessToken);
        this.authToken = response.accessToken;
      }), catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getAuthorizationToken() {
    return 'Bearer ' + localStorage.getItem('loggedInUserToken');
  }

  getUserRole() {
    return JSON.parse(localStorage.getItem('loggedInUser')).roles[0].name;
  }

  handleError(error) {
    let errorMessage = '';
    console.log('full error msg: ', error);
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `${error.error.message}`;
    } else {
      // server-side error
      errorMessage = 'Registration No. or Password is incorrect';
    }
    return throwError(errorMessage);
  }

}
