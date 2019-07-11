import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
    Loading,
    LoadingController,
    AlertController,
    ToastController } from 'ionic-angular';
import { CallLog, CallLogObject } from '@ionic-native/call-log';

import jsSHA from 'jssha'
import { arrayDistinct } from '../../lib/utils';
import { UtilsService } from './utils';
import { PhoneValidator } from '../../validators/phone.validator';

@Component({
  selector: 'page-spam',
  templateUrl: 'spam.html'
})
export class SpamPage {
    categories: string;
    calls: any;
    callsFiltered: any[];
    loading: Loading;
    formSpam: FormGroup;
    country: FormControl;

    phoneNumber: any;
    spamType: any;

    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public utils: UtilsService,
        private formBuilder: FormBuilder) {

        this.utils = utils;
        this.categories = "reportedCallHistorySpam";
        this.callsFiltered = [];

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



        // Initialization of the filters
        let filters: CallLogObject[] = [
            {
                name:"type",
                value: ["1", "3"], // INCOMING_TYPE and MISSED_TYPE
                operator: "=="
            }
        ];

        // retrive the list of spams from the back-end service
        this.utils.loadSpamsLight()
        .then((dataSpam)=>{
            // data.sort(function(a, b){
            //     return b.date - a.date;
            // });

            // filters.push({
            //     name: "number",
            //     value: dataSpam.map(spam => {return spam.number}),
            //     operator: "=="
            // })

            let hashes: string[] = dataSpam.map(spam => {return spam.number_hash});

            CallLog.requestReadPermission()
            .then(()=>{
                CallLog.getCallLog(filters)
                .then((dataLog)=> {
                    // filter the list of calls with the know spam hashes
                    this.callsFiltered = dataLog.filter(function(log){
                        let shaObj = new jsSHA("SHA-512", "TEXT");
                        shaObj.update(log.number);
                        return hashes.includes(shaObj.getHash("HEX"));
                    })

                    // make the list unique
                    this.callsFiltered = arrayDistinct(this.callsFiltered,
                                                        'number');

                    // count the number of report for each spam number
                    this.callsFiltered = this.callsFiltered.map(function(log) {
                        let shaObj = new jsSHA("SHA-512", "TEXT");
                        shaObj.update(log.number);
                        log.occurences = hashes.filter(function(item){ return item === shaObj.getHash("HEX"); }).length;
                        return log;
                    });
                })
                .catch((err)=>{
                    console.log("Error getCallLog");
                });
            })
            .catch((err)=>{
                console.log(err);
            });

        })
        .catch((err)=>{
            console.log("Error when retrieving list of spams.");
        });
    }

    onSpamSubmit() {
        let phoneNumber = this.formSpam.get('phoneNumber').value;
        let spamType = this.formSpam.get('spamType').value;

        let alert = this.alertCtrl.create({
          title: 'Spam confirmation',
          subTitle: `Report this number as a spam (${this.formSpam.get('spamType').value}) ?`,
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
                      console.log('Cancel clicked');
                  }
              },
          ]
        });
        alert.present();
    }

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
                      thankingToast.present();

                      this.utils.reportSpam(phoneNumber, 'Other');
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


    // confirmHam() {
    //     let alert = this.alertCtrl.create({
    //       title: 'Ham confirmation',
    //       subTitle: 'Confirm this number is not a spam?',
    //       buttons: [
    //           {
    //               text: 'OK',
    //               role: 'ok',
    //               handler: data => {
    //                   const thankingToast = this.toastCtrl.create({
    //                       message: 'Thank you for your contribution.',
    //                       duration: 3000
    //                   });
    //                   thankingToast.present();
    //                 }
    //           },
    //           {
    //               text: 'Cancel',
    //               role: 'cancel',
    //               handler: data => {
    //                   console.log('Cancel clicked');
    //               }
    //           },
    //       ]
    //     });
    //     alert.present();
    // }


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
