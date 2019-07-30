import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { loadJson, loadRightLanguage } from '../../../lib/utils';

import { GamesQuizPage } from './../gamesquiz';

@Component({
  selector: 'page-phishornot',
  templateUrl: 'phishornot.html'
})

export class phishOrNotPage {
  dataGame : any;
  answers : any; //answers and if they are found 1=found
  gameScore=0; //score of the current game

  @ViewChild('gameSlides') gameSlides: any;
  readonly PARENTJSON = '../../assets/data/gamesquiz/gamesquiz.json'; //default json

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private storage: Storage,
    private domSanitizer: DomSanitizer,
     ) {
        if (typeof navParams.get('dataGame') !== 'undefined') { //load the game
         this.dataGame = navParams.get('dataGame');
         console.log(this.dataGame)
       }
  }

// init some var, this function is defined by ionic and called just after the constructor
  ionViewWillEnter (){

  }

    /*
    * Action to verify an answer
    * @answer : choice made 1=legit 0=phish
    * @index : index of the question
    */
    choosedAnswer(answer, index){
      this.gameSlides.lockSwipeToPrev(true); //prevent to go back
      if(this.dataGame[0].items[index].legit==answer){
        this.gameScore++;
      }
      if(this.dataGame[0].items.length -1 ==index){
        this.storage.set(this.dataGame[0].storageKey,this.gameScore/(index+1)); // save the global score of the quiz
      }

        this.gameSlides.slideNext();
    }

    /*
    * Go to next slide
    */
    nextSlide(){
      this.gameSlides.slideNext();
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

}
