import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { loadJson } from '../../lib/utils';
import { loadRightLanguage } from '../../lib/utils';


@Component({
  selector: 'page-tipstricks',
  templateUrl: 'tipstricks.html'
})

export class TipsTricksPage {
  selectedTipsTricks: any;
  article: any;

  //define the subpages
  pages: Array<{title: string, url: any, article: any, icon: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private domSanitizer: DomSanitizer,) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTipsTricks = navParams.get('tipsTricksitem');
    if(this.selectedTipsTricks){
      this.article = this.selectedTipsTricks.article;
    }
    this.translate.stream(['Password', 'E-mail', 'Clean Workspace','Web', 'Waste Management']).subscribe(translations => {
      this.pages = [
        { title: translations['Password'], url: '../assets/data/tipstricks/password.json' , article: '', icon: 'arrow-dropright-circle'},
        { title: translations['E-mail'], url: '../assets/data/tipstricks/email.json' , article: '', icon: 'arrow-dropright-circle'},
        { title: translations['Clean Workspace'], url: '../assets/data/tipstricks/cleanworkspace.json' , article: '', icon: 'arrow-dropright-circle'},
        { title: translations['Web'], url: '../assets/data/tipstricks/web.json' , article: '', icon: 'arrow-dropright-circle'},
        { title: translations['Waste Management'], url: '../assets/data/tipstricks/wastemanagement.json' , article: '', icon: 'arrow-dropright-circle'}
      ];
    })
  }

/*
* Open a tips trick iten (e.g password)
*/
  openPage(event, page) {
    loadJson(page.url,this.domSanitizer).then(data => {
      page.article = data;
      page.article = loadRightLanguage(page.article,this.translate.currentLang);
      this.navCtrl.push(TipsTricksPage, {tipsTricksitem:page});
    });
  }
}
