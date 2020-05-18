import { Injectable, EventEmitter, OnInit } from '@angular/core';

import json from '../../../assets/i18n/shared-bn.json';
import { Subject } from 'rxjs';
import { AuthService } from '../../modules/auth/auth.service';
import { UserType } from '../enums/toast-title.js';

@Injectable({
  providedIn: 'root'
})
export class TranslationHelperService implements OnInit {
  public loggedInUser;
  language: string;
  translationsUrl = './assets/i18n/shared-bn.json';
  DEFAULT_TRANSLATIONS: any;
  PMEAT_DEFAULT_LANGUAGE = 'bn';
  receivedFilter: Subject<string>;
  public userType = UserType;

  constructor(
    private authService: AuthService
  ) {
    this.loadDefaultTranslations();
    this.receivedFilter = new Subject<string>();

    if (this.authService.getUserType() && this.authService.getUserType().toLowerCase() === 'student') {
      if (localStorage.getItem('selectedLanguage')) {
        this.setLanguage(localStorage.getItem('selectedLanguage'));
      } else {
        localStorage.setItem('selectedLanguage', this.getDefaultLanguage());
        this.setLanguage(this.getDefaultLanguage());
      }
    } else {
      this.setDefaultLanguage('en');
      this.setLanguage(this.getDefaultLanguage());
    }
  }

  ngOnInit(): void {
    console.log('init translation');
  }

  raiseEvent(language: string): void {
    console.log('language changed to ' + language);
    this.setLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    this.receivedFilter.next(language);
  }

  setLanguage(language) {
    this.language = language;
  }

  getLanguage() {
    return this.language;
  }

  setDefaultLanguage(language) {
    this.PMEAT_DEFAULT_LANGUAGE = language;
  }

  getDefaultLanguage() {
    return this.PMEAT_DEFAULT_LANGUAGE;
  }

  loadDefaultTranslations() {
    this.DEFAULT_TRANSLATIONS = json;
  }

  getSharedTranslationJSON() {
    return this.DEFAULT_TRANSLATIONS;
  }
}
