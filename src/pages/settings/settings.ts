import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  language : any;
  languages : any;

  constructor(
    public navCtrl: NavController,
    private languageService: LanguageService,
    private translate: TranslateService) {

  this.languages = this.languageService.getLanguages();
  this.language =  this.languages.find(lang => lang.value === this.translate.currentLang);
  }

  public languageChange() : void {
    this.languageService.setLanguage(this.language['value']);
  }

}
