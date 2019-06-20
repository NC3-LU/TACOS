import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DomSanitizer } from '@angular/platform-browser';
import { loadJson } from '../../lib/utils';
import { File } from '@ionic-native/file/ngx';

import { TipsTricksPage } from '../tipstricks/tipstricks';
import { VideosPage } from '../videos/videos';
import { SpamPage } from '../spam/spam';
import { GamesQuizPage } from '../gamesquiz/gamesquiz';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public isSearchBarOpened = false;
  public searchTerm : any;
  pages : any;
  jsonFiles : any = null;
  searchResult : any = [];
  searching : any = false;

  constructor(
    public navCtrl: NavController,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private file: File) {
      this.translate.stream(['Home',
                            'Tips and Tricks',
                            'Videos',
                            'Spam signal',
                            'Games and Quiz',
                            'Settings'])
                    .subscribe(translations => {
        this.pages = [
          { title: translations['Tips and Tricks'], component: TipsTricksPage, img: 'url(../assets/imgs/t&t/17.png)'},
          { title: translations['Videos'], component: VideosPage, img: 'url(../assets/imgs/t&t/7.png)'},
          { title: translations['Games and Quiz'], component: GamesQuizPage, img: 'url(../assets/imgs/t&t/11.png)'},
          { title: translations['Spam signal'], component: SpamPage, img: 'url(../assets/imgs/t&t/14.png)'},
          { title: translations['Settings'], component: SettingsPage, img: 'url(../assets/imgs/t&t/9.png)' }
        ];
      })
  }

  onSearch(){
    this.searchResult = [];
    this.file.listDir(this.file.applicationDirectory, 'www/assets/data/tipstricks').then(
      (data) => {
        this.jsonFiles = data;
        // Plugin cordova File doesn't work in browser. For testing, comment out below line and comment 3 above lines
        //this.jsonFiles = [{name:'email.json'},{name:'password.json'},{name:'physicalsecurity.json'},{name:'web.json'} ];
        if (this.searchTerm) {
          for(let json of this.jsonFiles){
            loadJson('../assets/data/tipstricks/' + json.name,this.domSanitizer).then(data => {
              let result = data.filter(
                post => JSON.stringify(post).includes(this.searchTerm) &&
                post.language == this.translate.currentLang
              );
              if (result.length > 0) {
                this.searchResult.push(result);
              }
              this.searching = true;
            });
          }
        }else{
          this.searching = false;
        }
    });
  }

  openPage($event, result){
    let page = {article:[]};
    page.article.push(result);
    this.navCtrl.push(TipsTricksPage, {tipsTricksitem:page});
  }

  goPage(page){
    this.navCtrl.setRoot(page);
  }
}
