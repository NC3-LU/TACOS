import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  constructor(
    public platform: Platform,
    private translate: TranslateService,
    private storage: Storage) {
    }

  setInitialAppLanguage() {
    let browserLang = this.translate.getBrowserLang();
    this.translate.setDefaultLang('en')

    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
      }else{
        if (browserLang !== undefined) {
          this.setLanguage(browserLang); // default locale
        }
      }
    });
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en', img: '/assets/flags/en.svg' },
      { text: 'French', value: 'fr', img: '/assets/flags/fr.svg' },
      { text: 'Deutch', value: 'de', img: '/assets/flags/de.svg' },
    ];
  }

  setLanguage(lang) {
    this.translate.use(lang);
    this.storage.set(LNG_KEY, lang);
  }
}
