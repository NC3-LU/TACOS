import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-findvulnerabilities',
  templateUrl: 'findvulnerabilities.html'
})

export class findVulnerabilitiesPage {
  dataGame : any = null;
  answers : any; //answers and if they are found 1=found
  gameScore=0; //score of the current game

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private storage: Storage,
    private alertController:AlertController
     ) {
       this.dataGame = null;
       this.dataGame = navParams.get('data');
  }

  ionViewWillEnter (){
    this.answers = [];
    for (let i = 0; i < this.dataGame[0].vulnerabilities.length; i++) {
        this.answers[this.dataGame[0].vulnerabilities[i]['title']] = 0;
    }
    console.log(this.answers)
  }

  /*
  * Display a vulberability and its explanation
  */
  vulnFound(title : string,explanation : string){
    if(this.answers[title] == 0){
      this.gameScore++;
      this.answers[title] = 1;
      this.storage.set(this.dataGame[0].storageKey,this.gameScore/(this.dataGame[0].vulnerabilities.length)); // save the global score of the quiz
    }
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
