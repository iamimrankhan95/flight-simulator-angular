import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public url = 'http://192.168.101.41:9050/cms_login';

  constructor(private router: Router, private http: HttpClient) {}

  register(user: User) {
    return this.http.post<User>(this.url, user, this.httpOptions);
  }

  getUsers() {
    return this.http.get<any>(this.url);
  }

  deleteUser(user: User) {
    const id = user.id;
    const tempUrl = this.url + '/' + id;
    return this.http
      .delete<User>(tempUrl, this.httpOptions)
      .pipe(tap((_) => console.log(`deleted user id=${id}`)));
  }
  getUser(userId: number) {
    const tempUrl = this.url + '/' + userId;
    return this.http.get<User>(tempUrl);
  }
  updateUser(user: User, id: number) {
    const tempUrl = this.url + '/' + id;
    return this.http.put<User>(tempUrl, user, this.httpOptions);
  }
}
