import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const LNG_THEME = 'SELECTED_THEME';


@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(
        public platform: Platform,
        private storage: Storage) {
    }


    setInitialAppTheme() {
        this.storage.get(LNG_THEME).then(val => {
            if (val) {
                this.setTheme(val);
            } else {
                this.setTheme('light');
            }
        });
    }


    getThemes() {
        return [
            {text: 'Light', value: 'light'},
            {text: 'Dark', value: 'dark'},
        ];
    }


    setTheme(theme) {
        this.storage.set(LNG_THEME, theme);
    }
}
