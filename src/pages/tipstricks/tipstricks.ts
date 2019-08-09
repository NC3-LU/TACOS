import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { TranslateService } from '@ngx-translate/core';

import { loadJson } from '../../lib/utils';
import { loadRightLanguage } from '../../lib/utils';
import { VideosPage } from '../videos/videos';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private iab: InAppBrowser
     ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTipsTricks = navParams.get('tipsTricksitem');
    if(this.selectedTipsTricks){
      this.article = this.selectedTipsTricks.article;
    }

    if (typeof navParams.get('data') !== 'undefined') { //load the menu
     this.data = navParams.get('data');
     this.pages = this.data[0].tipstricks;
   }
  }


/*
* Open a tips trick item (e.g password)
*/
  openPage(event, page) {
    loadJson(page.url,this.domSanitizer).then(data => {
      page.article = data;
      page.article = loadRightLanguage(page.article,this.translate.currentLang);
      this.navCtrl.push(TipsTricksPage, {tipsTricksitem:page});
    });
  }

  /*
  * Open an external link
  */
  openExternalLink(item){
    this.iab.create(item,'_blank','location=yes');
  }

  /*
  * Open a tips trick item (e.g password)
  */
    goToVideos(event, data:Array<String>) {
        this.navCtrl.push(VideosPage, {searchTerm:data});
    }
}
