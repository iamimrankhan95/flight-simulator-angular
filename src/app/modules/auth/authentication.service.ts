import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { applicationUrl } from '../../shared/enums/application-urls';
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
    // localStorage.setItem('currentUser', credential);
    return this.http.post<any>(applicationUrl.auth.login, credential, {
      observe: 'body',
      responseType: 'json'
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAuthorizationToken() {
    return this.authToken;
  }
}
