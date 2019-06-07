import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

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

  //define the subpages
  pages: Array<{title: string, url: any, article: any, links: any,  icon: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,
     ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTipsTricks = navParams.get('tipsTricksitem');
    if(this.selectedTipsTricks){
      this.article = this.selectedTipsTricks.article;
    }
    this.translate.stream(['Password', 'E-mail', 'Physical Security','Web', 'Waste Management']).subscribe(translations => {
      this.pages = [
        { title: translations['Password'], url: '../assets/data/tipstricks/password.json' , article: '', links:'', icon: 'key'},
        { title: translations['E-mail'], url: '../assets/data/tipstricks/email.json' , article: '', links:'', icon: 'mail'},
        { title: translations['Physical Security'], url: '../assets/data/tipstricks/physicalsecurity.json' , article: '', links:'', icon: 'desktop'},
        { title: translations['Web'], url: '../assets/data/tipstricks/web.json' , article: '', links:'', icon: 'globe'},
        //{ title: translations['Waste Management'], url: '../assets/data/tipstricks/wastemanagement.json' , article: '', links:'', icon: 'trash'}
      ];
    })
  }

/*
* Extract hostname of url
* based on https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
* @var url:string the url containing the hostname to extrat
*/

extractHostName(url:string){
  var hostname;
  if (url.indexOf("//") > -1)
        hostname = url.split('/')[2];
    else
        hostname = url.split('/')[0];

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove www
    hostname = hostname.split('www')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
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
  * Open a tips trick item (e.g password)
  */
    goToVideos(event, data:Array<String>) {
        this.navCtrl.push(VideosPage, {searchTerm:data});
    }
}
