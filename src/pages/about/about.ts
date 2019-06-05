import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
    appVersion:any;

    constructor(public navCtrl: NavController) {

        AppVersion.getVersionNumber().then(ver => {
            this.appVersion = ver;
        }).catch(function(error) {
            console.log(error);
        });

  }
}
