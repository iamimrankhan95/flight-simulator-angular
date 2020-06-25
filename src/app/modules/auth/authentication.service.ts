import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { applicationUrl } from '../../shared/enums/application-urls';
import { tap, catchError } from 'rxjs/operators';
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
  private authToken = 'some-auth-token';
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
    return this.http.post<any>(applicationUrl.auth.login, credential, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      tap((response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response))
        localStorage.setItem('loggedInUserToken', response.accessToken)
      }), catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // this.router.navigate(['/login']);
  }

  getAuthorizationToken() {
    return this.authToken;
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
