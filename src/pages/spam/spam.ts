import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
    Loading,
    LoadingController,
    AlertController,
    ToastController } from 'ionic-angular';

import { UtilsService } from './utils';
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


    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public utils: UtilsService,
        private formBuilder: FormBuilder) {

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
    }


    /*
    * Fired by the form to submit new spam.
    */
    onSpamSubmit() {
        let phoneNumber = this.formSpam.get('phoneNumber').value;
        let spamType = this.formSpam.get('spamType').value;

        let alert = this.alertCtrl.create({
          title: 'Spam confirmation',
          subTitle: 'Report this number as a spam ?',
          buttons: [
              {
                  text: 'OK',
                  role: 'ok',
                  handler: data => {
                      const thankingToast = this.toastCtrl.create({
                          message: 'Thank you for your contribution.',
                          duration: 3000
                      });
                      thankingToast.present();
                      this.utils.reportSpam(phoneNumber, spamType);
                    }
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                      //console.log('Cancel clicked');
                  }
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
          title: 'Spam confirmation',
          subTitle: 'Confirm this number is a spam?',
          buttons: [
              {
                  text: 'OK',
                  role: 'ok',
                  handler: data => {
                      const thankingToast = this.toastCtrl.create({
                          message: 'Thank you for your contribution.',
                          duration: 3000
                      });
                      this.utils.reportSpam(phoneNumber, 'other').then(()=>{
                          thankingToast.present();
                          this.onSearchSpamSubmit();
                      });
                    }
              },
              {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                      console.log('Cancel clicked');
                  }
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
          title: 'Help',
          subTitle: 'International phone number formatting (E.164):<hr />' +
                    '<code>[+][country code][area code][local phone number]</code><hr />' +
                    'Example:<hr />' +
                    '<code>+352 6x1 xxx xxx</code>',
          buttons: [
              {
                  text: 'OK',
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
          content: 'Please wait...'
      });
      this.loading.present();
    }
}
