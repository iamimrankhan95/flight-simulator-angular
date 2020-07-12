import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { AppHttpService } from './app-http.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
    private appService: AppService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
