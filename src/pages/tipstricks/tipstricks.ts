import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { loadJson } from '../../lib/utils';
import { loadRightLanguage } from '../../lib/utils';
import { VideosPage } from '../videos/videos';

import { WindowRefService, ICustomWindow } from '../../app/window-ref.service';


@Component({
  selector: 'page-tipstricks',
  templateUrl: 'tipstricks.html'
})

export class TipsTricksPage {
  selectedTipsTricks: any;
  article: any;
  data: any;

  //define the subpages
  pages: Array<{title: string, url: any, article: any, links: any,  icon: string}>;
  videosList: any;
  private _window: ICustomWindow;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private windowRef: WindowRefService
     ) {
    this._window = windowRef.nativeWindow;
    if (typeof navParams.get('data') !== 'undefined') { //load the menu
     this.data = navParams.get('data');
     this.pages = this.data[0].tipstricks;
     this.pages.sort(function(pageA,pageB){
       if (pageA.title>pageB.title)
        return 1
       else
        return -1
     });
   }
  }

//init some variables
  ionViewWillEnter   (){
  var list = [];
  var langue = this.translate.currentLang;
  // If we navigated to this page, we will have an item available as a nav param
  if(typeof this.navParams.get('videosList') == 'undefined'){
    loadJson('../../assets/data/videos.json',this.domSanitizer).then(data => {
    data.forEach(function(video){
      if(video.language == langue){
        list.push(video.title.toLowerCase());
        video.keywords.forEach(function(keyword){
          list.push(keyword.toLowerCase());
          });
        }
      });
      this.videosList = list;
    });
  }else{
    this.videosList = this.navParams.get('videosList');
  }
  if(typeof this.navParams.get('tipsTricksitem') !== 'undefined'){
    this.selectedTipsTricks = this.navParams.get('tipsTricksitem');
    this.article = this.selectedTipsTricks.article;
   }
  }

/*
* Check if a video exist (search title and keywords in the list of videos)
*/
  checkVideo(haystack:Array<String>,keywords: Array<String>,title : String){
    var find = false;
    if(haystack.indexOf(title.toLowerCase())>-1)
      find= true;
    keywords.forEach(function (st){
       if(haystack.indexOf(st.toLowerCase())>-1)
         find= true;
     });
    return find;
  }


/*
* Open a tips trick item (e.g password)
*/
  openPage(event, page) {
    loadJson(page.url,this.domSanitizer).then(data => {
      page.article = data;
      page.article = loadRightLanguage(page.article,this.translate.currentLang);
      this.navCtrl.push(TipsTricksPage, {tipsTricksitem:page, videosList:this.videosList});
    });
  }

  /*
  * Open an external link
  */
  openExternalLink(item){
    this._window.open(item,'_blank','location=yes');
  }

  /*
  * Open a tips trick item (e.g password)
  */
    goToVideos(event, data:Array<String>) {
        this.navCtrl.push(VideosPage, {searchTerm:data});
    }
}
