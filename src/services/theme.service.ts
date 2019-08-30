import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

const LNG_THEME = 'SELECTED_THEME';


@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    constructor(
        public platform: Platform,
        public event: Events,
        private storage: Storage) {
    }


    setInitialAppTheme() {
        this.storage.get(LNG_THEME).then(val => {
            if (val) {
                this.setTheme(val);
            } else {
                this.setTheme('default-theme');
            }
        });
    }


    getThemes() {
        return [
            {text: 'Default', value: 'default-theme'},
            {text: 'Dark', value: 'dark-theme'},
        ];
    }


    setTheme(theme) {
        this.storage.set(LNG_THEME, theme).then(() => {
            this.event.publish('theme:change');
        });
    }
}
