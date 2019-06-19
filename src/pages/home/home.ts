import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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

  pages : any;

  constructor(
    public navCtrl: NavController,
    private translate: TranslateService) {
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

  goPage(page){
    this.navCtrl.setRoot(page);
  }
}
