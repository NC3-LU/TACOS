import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { loadJson } from '../../../lib/utils';
import { loadRightLanguage } from '../../../lib/utils';


@Component({
  selector: 'page-findvulnerabilities',
  templateUrl: 'findvulnerabilities.html'
})

export class findVulnerabilitiesPage {
  dataGame : any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private storage: Storage,
    private alertController:AlertController
     ) {
       this.dataGame = navParams.get('data');
  }

  /*
  * Display a vulberability and its explanation
  */
  vulnFound(title,explanation){
    let alert = this.alertController.create({
      title: title,
      subTitle:explanation,
      buttons: [
         {
           text: 'Ok',
           role: 'cancel',
         }
       ]
     });
  alert.present();
  }


}
