import {Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
  }
}
