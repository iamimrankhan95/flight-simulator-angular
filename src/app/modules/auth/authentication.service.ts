import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { applicationUrl } from '../../shared/enums/application-urls';
import { tap, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { User } from '../../shared/models/user';

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

  public currentUser: User;
  private authToken;

  constructor(private router: Router, private http: HttpClient) {
  }

  login(credential: any) {
    return this.http.post<any>(applicationUrl.auth.login, credential).pipe(
      tap((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        localStorage.setItem('currentUserToken', response.accessToken);
        this.currentUser = new User();
        this.currentUser.companyId = response.companyId;
        this.currentUser.departmentId = response.departmentId;
        this.currentUser.permission = response.permission;
        this.currentUser.roles = response.roles;
        this.currentUser.id = response.userId;
        this.currentUser.username = response.username;
        this.authToken = response.accessToken;
      }), catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearUserData();
    this.router.navigate(['/auth/login']);
  }

  clearUserData() {
    localStorage.clear();
    this.currentUser = null;
  }

  getAuthorizationToken() {
    return 'Bearer ' + localStorage.getItem('currentUserToken');
  }

  getUserRole() {
    return JSON.parse(localStorage.getItem('currentUser')).roles[0].name;
  }

  getCurrentUser(): User {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser === undefined) {
      this.logout();
      return;
    } else {
      return currentUser;
    }
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
