import { Component } from '@angular/core';
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

  //define the subpages
  quizs: Array<{title: string, url: any, article: any, links: any,  icon: string}>;

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
           { title: translations['Password'], url: '../assets/data/tipstricks/email.json' , article: '', links:'', icon: 'url(../assets/imgs/t&t/6.png)'},
           { title: translations['Physical Security'], url: '../assets/data/tipstricks/physicalsecurity.json' , article: '', links:'', icon: 'url(../assets/imgs/t&t/23.png)'},
           { title: translations['Web'], url: '../assets/data/tipstricks/web.json' , article: '', links:'', icon: 'url(../assets/imgs/t&t/4.png)'},
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
        this.navCtrl.push(GamesQuizPage, {tipsTricksitem:page});
      });
    }

}
