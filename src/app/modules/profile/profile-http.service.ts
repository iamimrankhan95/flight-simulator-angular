import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { applicationUrl } from '../../shared/enums/application-urls';

@Injectable({
  providedIn: 'root'
})
export class ProfileHttpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient
  ) { }

  changePassword(currentPassword: String, newPassword: String, retypedNewPassword: String, username: String) {
    return this.http.put(applicationUrl.profile.changePassword, {currentPassword, newPassword, retypedNewPassword, username}, this.httpOptions);
  }
}
