import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


import { loadJson } from '../../lib/utils';
import { loadRightLanguage } from '../../lib/utils';
import { findVulnerabilitiesPage } from './findvulnerabilities/findvulnerabilities';
import { phishOrNotPage } from './phishornot/phishornot';


@Component({
  selector: 'page-gamesquiz',
  templateUrl: 'gamesquiz.html'
})

export class GamesQuizPage {
  readonly INITIALJSON = '../assets/data/gamesquiz/gamesquiz.json'; //default json

  selectedQuiz: any; //selected quiz when a quiz is selected

  //define the quiz stuff
  quizScore=0; //score of the current quiz
  quizCorrection : any; //array which store the correction of the quiz
  //define the game stuf

  gamesList = []; //list of the games and their respectives pages;

  @ViewChild('quizSlides') quizSlides: any;
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private storage: Storage,
     ) {
       // If we navigated to this page, we will have an item available as a nav param
       this.quizCorrection = [];
       if (typeof navParams.get('data') !== 'undefined') { //load the menu
        this.data = navParams.get('data');
      }
      else
       this.selectedQuiz = navParams.get('quizItem');
  }
  // init some var, this function is defined by ionic and called just after the constructor
    ionViewDidLoad (){
    this.gamesList['findVulnerabilitiesPage'] = findVulnerabilitiesPage; //init the list of the games
    this.gamesList['phishOrNotPage'] = phishOrNotPage;

    if (typeof this.navParams.get('data') !== 'undefined'){
        for (let i = 0; i < this.data[0].quizs.length; i++) {
            this.getQuizScore(this.data[0].quizs[i].storageKey).then(val => {
              this.data[0].quizs[i].score = val;
            });
        }
        for (let i = 0; i < this.data[0].games.length; i++) {
          if(this.data[0].games[i].storageKey!=null)
            this.getQuizScore(this.data[0].games[i].storageKey).then(val => {
              this.data[0].games[i].score = val;
            });
          else
            this.data[0].games[i].score = -1;            
        }
      }
    }

    /*
    * Load the result of a unique quiz
    * @key  of the quiz sored in DB
    */
     async getQuizScore(storageKey) {
      return await this.storage.get(storageKey).then((val)=>{
            if(val!=null)
             return val
            else
             return -1
           });
      }

  /*
  * Open a quiz (e.g password)
  */
    openQuiz(event, page) {
      console.log(page);
      loadJson(page.game,this.domSanitizer).then(data => {
        page.article = data;
        page.article = loadRightLanguage(page.article,this.translate.currentLang);

        this.navCtrl.push(GamesQuizPage, {quizItem:page});
      });
    }
    /*
    * Action to verify an answer
    * @answer : array of one answer
    * @question : question
    * @index : index of the question
    */
    choosedAnswer(answer, question, index){
      this.quizSlides.lockSwipeToPrev(true); //prevent to go back
        if(answer[0]=="true"){ //the right answer
            this.quizScore++;
            this.quizCorrection.push([question.title,  true, question.explanation]);
        }else{//false answer
            this.quizCorrection.push([question.title,  false, question.explanation]);
        }
        if(this.selectedQuiz.article[0].questions.length -1 == index){ //last question
          this.storage.set(this.selectedQuiz.storageKey,this.quizScore/(index+1)); // save the global score of the quiz
        }
        console.log(this.quizCorrection);
        this.quizSlides.slideNext();
    }
    /*
    * Action for quiz restarting
    */
    restartQuiz() {
        this.quizScore = 0;
        this.quizCorrection = [];
        this.quizSlides.lockSwipeToPrev(false)
        this.quizSlides.slideTo(0);
        this.quizSlides.lockSwipeToPrev(true)
    }

    explanation(){
      this.quizSlides.slideNext();
    }

    /*
    * back to the menu of quiz and games
    */
    backToTheMenu(){
      loadJson(this.INITIALJSON,this.domSanitizer).then(data => { //load the data in advance
        data = loadRightLanguage(data,this.translate.currentLang);
        this.navCtrl.setRoot(GamesQuizPage, {data:data});
      });
    }

    /*
    * Load a game
    */
    openGame($event, game){
      if(game.page!=null && game.dataMenu !=null ){
        loadJson(game.dataMenu,this.domSanitizer).then(data => { //load the data in advance
          data = loadRightLanguage(data,this.translate.currentLang);
          this.navCtrl.push(this.gamesList[game.page], {dataMenu:data});
        });
      }else if (game.page!=null && game.dataGame !=null ){
        loadJson(game.dataGame,this.domSanitizer).then(data => { //load the data in advance
          data = loadRightLanguage(data,this.translate.currentLang);
          this.navCtrl.push(this.gamesList[game.page], {dataGame:data});
        });
    }
  }

}
