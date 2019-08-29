import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
    Loading,
    LoadingController,
    AlertController,
    ToastController } from 'ionic-angular';

import { UtilsService } from './utils';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { PhoneValidator } from '../../validators/phone.validator';


@Component({
  selector: 'page-spam',
  templateUrl: 'spam.html'
})
export class SpamPage {
    loading: Loading;

    categories: string;
    calls: any;
    spamNumbers: any[];

    country: FormControl;
    phoneNumber: any;
    spamType: any;
    formSpam: FormGroup;
    formSearchSpam: FormGroup;
    customAlertOptions: any = {ccsClass:null};
    theme:string = 'cases-theme';


    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public utils: UtilsService,
        private translate: TranslateService,
        private formBuilder: FormBuilder,
        private storage: Storage) {

        this.utils = utils;
        this.categories = "checkSpam";
        this.spamNumbers = [];

        this.country = new FormControl('LU', Validators.required);

        this.formSpam = this.formBuilder.group({
            country: this.country,
            phoneNumber: new FormControl('', Validators.compose([
                      PhoneValidator.validCountryPhone(this.country),
                      // Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),
                      Validators.required
                ])),
            spamType: new FormControl('', Validators.required)
        });

        this.formSearchSpam = this.formBuilder.group({
            country: this.country,
            phoneNumber: new FormControl('', Validators.compose([
                      PhoneValidator.validCountryPhone(this.country),
                      // Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),
                      Validators.required
                ]))
        });

        this.storage.get('SELECTED_THEME').then(val => {
          if(val){
            this.customAlertOptions = {
                cssClass: (val == 'dark-theme' ? 'alertDarkCss': null)
            }
            this.theme = val;
          }
        });
    }


    /*
    * Fired by the form to submit new spam.
    */
    onSpamSubmit() {
        let phoneNumber = this.formSpam.get('phoneNumber').value;
        let spamType = this.formSpam.get('spamType').value;
        let alert = this.alertCtrl.create({
          cssClass: this.theme == 'dark-theme' ? 'alertDarkCss': null,
          title: this.translate.instant('Spam confirmation'),
          subTitle: this.translate.instant('Report this number as a spam ?'),
          buttons: [
              {
                  text: 'OK',
                  role: 'ok',
                  handler: () => {
                      const thankingToast = this.toastCtrl.create({
                          message: this.translate.instant('Thank you for your contribution.'),
                          duration: 3000
                      });
                      thankingToast.present();
                      this.utils.reportSpam(phoneNumber, spamType);
                    }
              },
              {
                  text: this.translate.instant('Cancel'),
                  role: 'cancel',
                  handler: () => {}
              },
          ]
        });
        alert.present();
    }


    /*
    * If the user want to search for a spam manually.
    */
    onSearchSpamSubmit() {
        let phoneNumber = this.formSearchSpam.get('phoneNumber').value;

        if (phoneNumber != '') {
            this.utils.searchSpam(phoneNumber)
            .then((occurences)=>{
                if (occurences != 0) {
                    this.spamNumbers = [{
                        'number': phoneNumber,
                        'date': '',
                        'occurences': occurences
                    }];
                } else {
                    this.spamNumbers = [];
                }
            })
        }

    }


    /*
    * Confirm a spam.
    */
    confirmSpam(phoneNumber: string) {
        let alert = this.alertCtrl.create({
          cssClass: this.theme == 'dark-theme' ? 'alertDarkCss': null,
          title: this.translate.instant('Spam confirmation'),
          subTitle: this.translate.instant('Confirm this number is a spam?'),
          buttons: [
              {
                  text: this.translate.instant('OK'),
                  role: 'ok',
                  handler: () => {
                      const thankingToast = this.toastCtrl.create({
                          message: this.translate.instant('Thank you for your contribution.'),
                          duration: 3000
                      });
                      this.utils.reportSpam(phoneNumber, 'other').then(()=>{
                          thankingToast.present();
                          this.onSearchSpamSubmit();
                      });
                    }
              },
              {
                  text: this.translate.instant('Cancel'),
                  role: 'cancel',
                  handler: () => {}
              },
          ]
        });
        alert.present();
    }

    /*
    * Display a help box in order to explain how to format a phone number.
    */
    onAskHelp() {
        let alert = this.alertCtrl.create({
          cssClass: this.theme == 'dark-theme' ? 'alertDarkCss': null,
          title: this.translate.instant('Help'),
          subTitle: this.translate.instant('International phone number formatting (E.164):<hr />') +
                    this.translate.instant('<code>[+][country code][area code][local phone number]</code><hr />') +
                    this.translate.instant('Example:<hr />') +
                    '<code>+352 6x1 xxx xxx</code>',
          buttons: [
              {
                  text: this.translate.instant('OK'),
                  role: 'ok'
              }
          ]
        });
        alert.present();
    }


    /*
    * Manage loading
    */
    handleIFrameLoadEvent(): void {
        this.loading.dismiss();
    }


    startIFrameLoadEvent(): void {
      this.loading = this.loadingCtrl.create({
          content: this.translate.instant('Please wait...')
      });
      this.loading.present();
    }
}
