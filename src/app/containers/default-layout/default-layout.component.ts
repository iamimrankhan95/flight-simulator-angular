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
  title = 'flight-simulator';

  constructor(
    private router: Router,
    public authenticationservice: AuthenticationService) { }

  ngOnInit() {
  }
}
