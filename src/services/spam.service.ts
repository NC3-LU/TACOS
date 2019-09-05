import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

const SPAM_SEND_CLEAR = 'SPAM_SEND_CLEAR';


@Injectable({
  providedIn: 'root'
})
export class SpamService {
    constructor(
        public platform: Platform,
        private storage: Storage) {
    }

    setInitialSpamSettings() {
        this.storage.get(SPAM_SEND_CLEAR).then(val => {
            if (val == null) {
                this.storage.set(SPAM_SEND_CLEAR, true);
            }
        });
    }


    /*
    * Returns the value of SPAM_SEND_CLEAR.
    */
    getSpamSendClear(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storage.get(SPAM_SEND_CLEAR).then(val => {
                resolve(val);
            }).catch((error : any) => {
                reject("getSpamSendClear");
            });
        });
    }


    /*
    * Toggle the value of SPAM_SEND_CLEARq
    */
    setSpamSendClear() {
        this.storage.get(SPAM_SEND_CLEAR).then(val => {
            // toggle the value
            this.storage.set(SPAM_SEND_CLEAR, !val);
        });
    }
}
