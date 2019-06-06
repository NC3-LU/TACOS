import { Component } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';
import { CallLog, CallLogObject } from '@ionic-native/call-log';

@Component({
  selector: 'page-spam',
  templateUrl: 'spam.html'
})
export class SpamPage {
    categories:string;
    calls: any;
    callsFiltered: any;
    loading: Loading;

    constructor(
        public alertCtrl:AlertController,
        public loadingCtrl: LoadingController) {

        this.categories = "reportedSpam";
        this.callsFiltered=[];

        // Get list of reported spam number from the server:
        //let spams = []; // example: ["+33651687613","+33675374400"]
        let filters: CallLogObject[] = [
            // {
            //     name: "number",
            //     value: spams,
            //     operator: "=="
            // },
            {
                name:"type",
                value: ["1", "3"], // INCOMING_TYPE and MISSED_TYPE
                operator: "=="
            }
        ];

        CallLog.requestReadPermission()
        .then(()=>{
            CallLog.getCallLog(filters)
            .then((data)=>{
                this.callsFiltered = data;
            })
            .catch((err)=>{
                console.log("Error getCallLog");
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    confirmSpam() {
        let alert = this.alertCtrl.create({
          title: 'Spam confirmation',
          subTitle: 'Confirm this number is a spam?',
          buttons: [
              {
                  text: 'OK',
                  role: 'ok',
                  handler: data => {
                      let thank = this.alertCtrl.create({
                          title: 'Spam confirmation',
                          subTitle: 'Thank you for your contribution.',
                          buttons: ['Dismiss']
                      });
                      thank.present();
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


    confirmHam() {
        let alert = this.alertCtrl.create({
          title: 'Ham confirmation',
          subTitle: 'Confirm this number is not a spam?',
          buttons: [
              {
                  text: 'OK',
                  role: 'ok',
                  handler: data => {
                      let thank = this.alertCtrl.create({
                          title: 'Ham confirmation',
                          subTitle: 'Thank you for your contribution.',
                          buttons: ['Dismiss']
                      });
                      thank.present();
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


    // showInitialLogAlert() {
    //     const confirm = this.alertCtrl.create({
    //         title: "Autorisation",
    //         message: "Need access to call log",
    //         buttons: [
    //             {
    //                 text: 'Ok',
    //                 handler: () => {
    //                     console.log('ok clicked');
    //                     CallLog.requestReadPermission()
    //                     .then(()=>{});
    //                 }
    //             },
    //             {
    //                 text: 'Cancel',
    //                 handler: () => {
    //                     console.log('cancel clicked');
    //                 }
    //             }
    //         ]
    //     });
    //     confirm.present();
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
