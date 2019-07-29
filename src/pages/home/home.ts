import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { DomSanitizer } from '@angular/platform-browser';
import { loadJson, loadRightLanguage } from '../../lib/utils';
import { File } from '@ionic-native/file/ngx';

import { TipsTricksPage } from '../tipstricks/tipstricks';
import { VideosPage } from '../videos/videos';
import { CSWLPage } from '../cswl/cswl';
import { SpamPage } from '../spam/spam';
import { GamesQuizPage } from '../gamesquiz/gamesquiz';
import { PasswordCardPage } from '../passwordcard/passwordcard';
import { NewsPage } from '../news/news';
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
                            'Spam signal',
                            'Tips and Tricks',
                            'Videos',
                            'Games and Quiz',
                            'Password Card',
                            'News',
                            'Settings',
                            'Calendar'])
                    .subscribe(translations => {
        this.pages = [
          { title: translations['Spam signal'], component: SpamPage, img: 'url(../assets/imgs/t&t/14.png)'},
          { title: translations['Tips and Tricks'], component: TipsTricksPage, img: 'url(../assets/imgs/t&t/17.png)', data:'../assets/data/tipstricks/tipstricks.json'},
          { title: translations['Videos'], component: VideosPage, img: 'url(../assets/imgs/t&t/7.png)'},
          { title: translations['Games and Quiz'], component: GamesQuizPage, img: 'url(../assets/imgs/t&t/11.png)', data:'../assets/data/gamesquiz/gamesquiz.json'},
          { title: translations['Password Card'], component: PasswordCardPage, img: 'url(../assets/imgs/t&t/12.png)'},
          { title: translations['News'], component: NewsPage, img: 'url(../assets/imgs/t&t/16.png)'},
          { title: translations['Settings'], component: SettingsPage, img: 'url(../assets/imgs/t&t/9.png)' },
          { title: translations['CSWL'], component: CSWLPage, img: 'url(../assets/imgs/t&t/16.png)'}
        ];
      })
  }

  onSearch(){
    this.searchResult = [];
    this.file.listDir(this.file.applicationDirectory, 'www/assets/data/tipstricks').then(
      (data) => {
        this.jsonFiles = data;
        // Plugin cordova File doesn't work in browser. For testing, comment out below line and comment 3 above lines
        //this.jsonFiles = [{name:'email.json'},{name:'password.json'},{name:'physicalsecurity.json'},{name:'web.json'},{name:'malware.json'},{name:'scrapping.json'},{name:'physicalsecurity.json'} ];
        if (this.searchTerm) {
          for(let json of this.jsonFiles){
            loadJson('../assets/data/tipstricks/' + json.name,this.domSanitizer).then(data => {
              let result = data.filter(
                post => JSON.stringify(post).toLowerCase().includes(this.searchTerm.toLowerCase()) &&
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
    if(page.data!=null){
      loadJson(page.data,this.domSanitizer).then(data => { //load the data in advance
        data = loadRightLanguage(data,this.translate.currentLang);
        this.navCtrl.setRoot(page.component, {data:data});
      });
    }
    else
      this.navCtrl.setRoot(page.component);
  }
}
