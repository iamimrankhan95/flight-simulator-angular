import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, private http: HttpClient) {
    // this.currentUserSubject =  new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // comment out the line above and remove the one below when api sends response
    this.currentUserSubject =  new BehaviorSubject<any>(localStorage.getItem('currentUser'));
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string): void {
    localStorage.setItem('currentUser', userName);
    // return this.http.get<any>(this.url);
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
