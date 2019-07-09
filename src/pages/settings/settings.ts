import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  language : any;
  languages : any;
  themes : any;
  theme : any;

  constructor(
    public navCtrl: NavController,
    private languageService: LanguageService,
    private themeService: LanguageService,
    private translate: TranslateService) {

        this.languages = this.languageService.getLanguages();
        this.language =  this.languages.find(lang => lang.value === this.translate.currentLang);

        this.themes = ['light', 'dark'];
        this.theme =  'light';
  }

  public languageChange() : void {
    this.languageService.setLanguage(this.language['value']);
  }

  public themeChange() : void {
    this.themeService.setTheme(this.theme['value']);
  }

}
