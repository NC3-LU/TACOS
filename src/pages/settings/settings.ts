import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {
  public language : string;
  public languages : Array<{text: string, value: string, img: string}>;


  constructor(
    public navCtrl: NavController,
    private languageService: LanguageService,
    private translate: TranslateService) {

  this.language = this.translate.currentLang;
  this.languages = this.languageService.getLanguages();
  }

  public languageChange() : void {
    this.languageService.setLanguage(this.language);
  }

}
