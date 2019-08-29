import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { loadJson, loadRightLanguage } from '../../../lib/utils';

@Component({
  selector: 'page-findvulnerabilities',
  templateUrl: 'findvulnerabilities.html'
})

export class findVulnerabilitiesPage {
  dataGame : any;
  dataMenu : any;
  answers : any; //answers and if they are found 1=found
  gameScore=0; //score of the current game
  theme:string = 'cases-theme';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private storage: Storage,
    private alertController:AlertController,
    private domSanitizer: DomSanitizer,
     ) {
       if (typeof navParams.get('dataMenu') !== 'undefined') { //load the menu
        this.dataMenu = navParams.get('dataMenu');
        console.log(this.dataMenu)
        this.dataGame = null;
      }
        if (typeof navParams.get('dataGame') !== 'undefined') { //load the game
         this.dataGame = navParams.get('dataGame');
         this.dataMenu = null;
       }

       this.storage.get('SELECTED_THEME').then(val => {
         if (val) {
           this.theme = val;
         }
       });
  }

// init some var, this function is defined by ionic and called just after the constructor
  ionViewWillEnter (){
    if(this.dataGame !=null){
      this.answers = [];
      for (let i = 0; i < this.dataGame[0].vulnerabilities.length; i++) {
          this.answers[this.dataGame[0].vulnerabilities[i]['title']] = 0;
      }
    }
  }

  /*
  * Open a quiz (e.g password)
  */
    openGame(game) {
      loadJson(game.game,this.domSanitizer).then(data => {
        game = data;
        game = loadRightLanguage(game,this.translate.currentLang);
        this.navCtrl.push(findVulnerabilitiesPage, {dataGame:game});
      });
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
      cssClass: this.theme == 'dark-theme' ? 'alertDarkCss': null,
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

// for debug to get the position of the point
  getCoordinates(event)
  {
      console.log(event.layerX+','+event.layerY);
  }

}
