import {Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../modules/auth/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  public loginUsername: string;
  // public loginId: number;

  constructor(
    private router: Router,
    private authenticationservice: AuthenticationService) { }

  ngOnInit() {
    // const user = JSON.parse(localStorage.getItem('currentUser'));

    // comment out the above line and remove the line below
    // const user = localStorage.getItem('currentUser');
    // if (user) {
    //   console.log(user);
    //   this.loginUsername = user;
    //   // this.loginId = user.data.id;
    // } else {
    //   this.router.navigate(['/auth/login']);
    // }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logoutClick() {
    this.authenticationservice.logout();
    this.router.navigate(['/auth/login']);
  }

  ChangePassword() {
    this.router.navigate(['/home/profile/change-password/']);
  }

}
