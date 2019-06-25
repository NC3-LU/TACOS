import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


import { loadJson } from '../../lib/utils';
import { loadRightLanguage } from '../../lib/utils';
import { findVulnerabilitiesPage } from './findvulnerabilities/findvulnerabilities';


@Component({
  selector: 'page-gamesquiz',
  templateUrl: 'gamesquiz.html'
})

export class GamesQuizPage {
  selectedQuiz: any;
  article: any;
  //define the quiz stuff
  quizs: Array<{title: string, url: any, article: any, score: number, icon: string}>; //array which display all available quiz
  quizScore=0; //score of the current quiz
  quizNameArray=['Password', 'Physical Security','Web']; //the name of the quiz
  quizCorrection : any; //array which store the correction of the quiz

  @ViewChild('quizSlides') quizSlides: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private storage: Storage,
     ) {
       // If we navigated to this page, we will have an item available as a nav param
       this.quizCorrection = [];
       this.selectedQuiz = navParams.get('quizItem');
       if(this.selectedQuiz){
         this.article = this.selectedQuiz.article;
       }
       this.getQuizScore(this.quizNameArray).then(arrayScore =>{
         this.translate.stream(this.quizNameArray).subscribe(translations => {
           this.quizs = [
             { title: translations['Password'], url: '../assets/data/gamesquiz/password.json' , score:arrayScore['Password'],article: '', icon: 'url(../assets/imgs/t&t/6.png)'},
             { title: translations['Physical Security'], url: '../assets/data/gamesquiz/physicalsecurity.json', score:arrayScore['Physical Security'], article: '', icon: 'url(../assets/imgs/t&t/23.png)'},
             { title: translations['Web'], url: '../assets/data/gamesquiz/web.json' ,score:arrayScore['Web'], article: '', icon: 'url(../assets/imgs/t&t/4.png)'},
           ];
         })
       });

  }

  /*
  * Load the result of all the quiz
  * @key keys of the quiz sored in DB 'quiz'+key[i]
  */
     async getQuizScore(key) {
      let arrayScore = [];
     for (let i = 0; i < key.length; i++) {
        let score = await this.storage.get('quiz'+key[i]).then((val)=>{
          if(val!=null)
           arrayScore[key[i]] = val
          else
           arrayScore[key[i]] = -1
         });
     }
     return arrayScore;
    }

  /*
  * Open a quiz (e.g password)
  */
    openQuiz(event, page) {
      loadJson(page.url,this.domSanitizer).then(data => {
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
        if(this.article[0].questions.length -1 == index){ //last question
          console.log('last question')
          console.log(this.quizScore)
          this.storage.set(this.article[0].storageKey,this.quizScore/(index+1)); // save the global score of the quiz
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
      this.navCtrl.setRoot(GamesQuizPage); //set the root and don't pop to refresh and get score
    }

    /*
    * Load a page like a game 
    */
    openPage(page){
      if(page=='findVulnerabilitiesPage'){
        loadJson('../assets/data/gamesquiz/findvulnerabilities/findvulnerabilities.json',this.domSanitizer).then(data => { //load the data in advance
          data = loadRightLanguage(data,this.translate.currentLang);
          this.navCtrl.push(findVulnerabilitiesPage, {data:data});
        });
      }
    }

}
