import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public url = 'http://192.168.101.41:9050/cms_login';

  constructor(private router: Router, private http: HttpClient) { }

  register(user: User) {
    return this.http.post<User>(this.url, user, this.httpOptions);
  }

  getUsers() {
    return this.http.get<any>(this.url);
  }
}
