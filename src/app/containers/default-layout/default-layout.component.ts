import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    public translateService: TranslateService) {
    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('en');

    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }
}
