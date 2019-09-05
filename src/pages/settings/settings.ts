import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { SpamService } from '../../services/spam.service';

const LNG_THEME = 'SELECTED_THEME';
const SPAM_SEND_CLEAR = 'SPAM_SEND_CLEAR';


@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    language: any;
    languages: any;
    themes: any;
    theme: any;
    spamClear: boolean;
    customAlertOptions: any = {ccsClass:null};
    customAlertOptionsWhitFlags : any = {ccsClass:'alertCountryFlags'};

    constructor(
        public navCtrl: NavController,
        private storage: Storage,
        private languageService: LanguageService,
        private themeService: ThemeService,
        private spamService: SpamService,
        private translate: TranslateService) {

        this.languages = this.languageService.getLanguages();
        this.language =  this.languages.find(lang => lang.value === this.translate.currentLang);

        this.themes = this.themeService.getThemes();
        this.storage.get(LNG_THEME).then((val) => {
            if (val) {
                this.theme =  this.themes.find(theme => theme.value === val).value;
                this.customAlertOptions = {
                    cssClass: (val == 'dark-theme' ? 'alertDark': null)
                }
                this.customAlertOptionsWhitFlags = {
                    cssClass: (val == 'dark-theme' ? 'alertDarkAndFlags': 'alertCountryFlags')
                }
            } else {
                this.theme = 'default-theme';
            }
        });

        this.storage.get(SPAM_SEND_CLEAR).then(val => {
            this.spamClear = val;
        });
    }


    public languageChange() : void {
        this.languageService.setLanguage(this.language['value']);
    }


    public themeChange() : void {
        this.themeService.setTheme(this.theme);
        this.customAlertOptions = {
            cssClass: (this.theme == 'dark-theme' ? 'alertDark': null)
        };
        this.customAlertOptionsWhitFlags = {
            cssClass: (this.theme == 'dark-theme' ? 'alertDarkAndFlags': 'alertCountryFlags')
        }
    }


    public spamChange() : void {
        this.spamClear = !this.spamClear;
        this.spamService.setSpamSendClear();
    }
}
