import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { loadJson } from '../../lib/utils';
import { loadRightLanguage } from '../../lib/utils';


@Component({
  selector: 'page-gamesquiz',
  templateUrl: 'gamesquiz.html'
})

export class GamesQuizPage {
  selectedQuiz: any;
  article: any;

  //define the quiz stuff
  quizs: Array<{title: string, url: any, article: any, icon: string}>;
  quizScore=0;
  @ViewChild('quizSlides') quizSlides: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
     ) {
       // If we navigated to this page, we will have an item available as a nav param
       this.selectedQuiz = navParams.get('quizItem');
       if(this.selectedQuiz){
         this.article = this.selectedQuiz.article;
       }
       this.translate.stream(['Password', 'Physical Security','Web']).subscribe(translations => {
         this.quizs = [
           { title: translations['Password'], url: '../assets/data/gamesquiz/password.json' , article: '', icon: 'url(../assets/imgs/t&t/6.png)'},
           { title: translations['Physical Security'], url: '../assets/data/gamesquiz/physicalsecurity.json' , article: '', icon: 'url(../assets/imgs/t&t/23.png)'},
           { title: translations['Web'], url: '../assets/data/gamesquiz/web.json' , article: '', icon: 'url(../assets/imgs/t&t/4.png)'},
         ];
       })
  }

  /*
  * Open a quiz (e.g password)
  */
    openQuiz(event, page) {
      loadJson(page.url,this.domSanitizer).then(data => {
        page.article = data;
        page.article = loadRightLanguage(page.article,this.translate.currentLang);
        console.log(page.article)

        this.navCtrl.push(GamesQuizPage, {quizItem:page});
      });
    }
    /*
    * Action to very an answer to a question
    */
    choosedAnswer(answer, question){
        if(answer[0]=="true"){
            this.quizScore++;
        }
        this.quizSlides.slideNext();
    }
    /*
    * Action for quiz restarting
    */
    restartQuiz() {
        this.quizScore = 0;
        this.quizSlides.lockSwipes(false);
        this.quizSlides.slideTo(0);
    }

}
