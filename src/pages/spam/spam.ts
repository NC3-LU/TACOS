import { Component } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';
import { CallLog, CallLogObject } from '@ionic-native/call-log';

@Component({
  selector: 'page-spam',
  templateUrl: 'spam.html'
})
export class SpamPage {
    startDate:string;
    oldStartDate:string;
    oldDuration:boolean;
    calls: any;
    callsFiltered: any;
    loading: Loading;
    searchTerm : any="";

    constructor(
        public alertCtrl:AlertController,
        public loadingCtrl: LoadingController) {

        this.startDate="";
        this.oldStartDate="";
        this.oldDuration=false;
        this.callsFiltered=[];

        // Get list of reported spam number from the server:
        let spams = []; // example: ["+33651687613","+33675374400"]
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
                let duration:number = 0;
                for(let i=0; i<data.length;i++){
                    duration = duration+data[i].duration;
                }
                //alert("duration : "+ duration);
                this.callsFiltered = data;
                //  "data : " + JSON.stringify(data));
            })
            .catch((err)=>{
                alert("error getcallLog");
            });
        })
        .catch((err)=>{
            console.log(err);
            //alert("error requestcalLog");
        });
    }


    showInitialLogAlert() {
        const confirm = this.alertCtrl.create({
            title: "Autorisation",
            message: "Need access to call log",
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        console.log('ok clicked');
                        CallLog.requestReadPermission()
                        .then(()=>{});
                    }
                },
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancel clicked');
                    }
                }
            ]
        });
        confirm.present();
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
