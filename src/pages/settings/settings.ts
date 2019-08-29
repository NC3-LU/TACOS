import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

const LNG_THEME = 'SELECTED_THEME';


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    language: any;
    languages: any;
    themes: any;
    theme: any;
    customAlertOptions: any = {ccsClass:null};

    constructor(
        public navCtrl: NavController,
        private storage: Storage,
        private languageService: LanguageService,
        private themeService: ThemeService,
        private translate: TranslateService) {

        this.languages = this.languageService.getLanguages();
        this.language =  this.languages.find(lang => lang.value === this.translate.currentLang);

        this.themes = this.themeService.getThemes();
        this.storage.get(LNG_THEME).then((val) => {
            if (val) {
                this.theme =  this.themes.find(theme => theme.value === val).value;
                this.customAlertOptions = {
                    cssClass: (val == 'dark-theme' ? 'alertDarkCss': null)
                }
            } else {
                this.theme = 'cases-theme';
            }
        });
    }


    public languageChange() : void {
        this.languageService.setLanguage(this.language['value']);
    }


    public themeChange() : void {
        this.themeService.setTheme(this.theme);
        this.customAlertOptions = {
            cssClass: (this.theme == 'dark-theme' ? 'alertDarkCss': null)
        };
    }
}
