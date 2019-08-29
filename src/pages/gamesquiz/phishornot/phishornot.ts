import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { loadJson, loadRightLanguage } from '../../../lib/utils';
import { ToastController } from 'ionic-angular';

import { GamesQuizPage } from './../gamesquiz';

@Component({
  selector: 'page-phishornot',
  templateUrl: 'phishornot.html'
})

export class phishOrNotPage {
  dataGame : any;
  answerCorrect : boolean;
  gameScore=0; //score of the current game
  theme:string = 'cases-theme';

  @ViewChild('gameSlides') gameSlides: any;
  readonly PARENTJSON = '../../assets/data/gamesquiz/gamesquiz.json'; //default json

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
     ) {
        if (typeof navParams.get('dataGame') !== 'undefined') { //load the game
         this.dataGame = navParams.get('dataGame');
       }

       this.storage.get('SELECTED_THEME').then(val => {
         if (val) {
           this.theme = val;
         }
       });

  }

// init some var, this function is defined by ionic and called just after the constructor
  ionViewWillEnter (){
  this.gameSlides.lockSwipeToNext(true);
  this.gameSlides.lockSwipeToPrev(true); //prevent to go back
  }

    /*
    * Action to verify an answer
    * @answer : choice made 1=legit 0=phish
    * @index : index of the question
    */
    choosedAnswer(answer, index){
      this.gameSlides.lockSwipeToPrev(true); //prevent to go back
      this.gameSlides.lockSwipeToNext(false);
      this.answerCorrect = false;
      if(this.dataGame[0].items[index].legit==answer){
        this.gameScore++;
        this.answerCorrect = true;
      }
      if(this.dataGame[0].items.length -1 ==index){
        this.storage.set(this.dataGame[0].storageKey,this.gameScore/(index+1)); // save the global score of the quiz (last slide)
      }
        this.gameSlides.slideNext();
        this.gameSlides.lockSwipeToNext(true);
    }

    /*
    * Go to next slide
    */
    nextSlide(){
      this.gameSlides.lockSwipeToNext(false);
      this.gameSlides.slideNext();
      this.gameSlides.lockSwipeToNext(true);
    }

    /*
    * Show the explanation
    * $event : the click prevent
    * index : index of the slide
    */
    showExplanation($event,index){
      if($event.target.className.indexOf("explanation")==0){
        if (this.dataGame[0].items[index].explanations[$event.target.className] !=null )
          {
            let toast = this.toastCtrl.create({
            message: this.dataGame[0].items[index].explanations[$event.target.className],
            duration: 10000, //10 seconds of display
            position: 'top',
            showCloseButton : true,
            closeButtonText : 'ok'
          });
          toast.present();
        }
      }
    }

    /*
    * Show the hyperlink in an alert box (avoid to open malicious link)
    * $event : the click prevent
    * index : index of the slide
    */
    showURL($event,index){

      if($event.target.className.indexOf("hyperlink")==0){
        if (this.dataGame[0].items[index].hyperlinks[$event.target.className] !=null )
          {
            let alert = this.alertCtrl.create({
              cssClass: this.theme == 'dark-theme' ? 'alertDarkCss': null,
              message: this.dataGame[0].items[index].hyperlinks[$event.target.className],
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
    }

    /*
    * Show the explanation for image
    * $event : the click prevent
    * index : index of the slide
    */
    showExplanationForImage($event,message){
      let toast = this.toastCtrl.create({
      message: message,
      duration: 10000, //10 seconds of display
      position: 'top',
      showCloseButton : true,
      closeButtonText : 'ok'
      });
      toast.present();
    }

    /*
    * Restart the game
    */
    restartGame() {
        this.gameScore = 0;
        this.gameSlides.lockSwipeToPrev(false)
        this.gameSlides.slideTo(0);
        this.gameSlides.lockSwipeToPrev(true)
    }

    /*
    * Back to the menu og quiz and games
    */
    backToTheMenu(){
      loadJson(this.PARENTJSON,this.domSanitizer).then(data => { //load the data in advance to have the score
        data = loadRightLanguage(data,this.translate.currentLang);
        this.navCtrl.setRoot(GamesQuizPage, {data:data});
      });
    }

    // for debug to get the position of the point
      getCoordinates(event)
      {
        console.log(event);
        console.log(event.layerX+','+event.layerY);
      }

}
