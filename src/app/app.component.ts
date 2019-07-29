import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { DomSanitizer } from '@angular/platform-browser';

import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { TipsTricksPage } from '../pages/tipstricks/tipstricks';
import { GamesQuizPage } from '../pages/gamesquiz/gamesquiz';
import { PasswordCardPage } from '../pages/passwordcard/passwordcard';
import { VideosPage } from '../pages/videos/videos';
import { CSWLPage } from '../pages/cswl/cswl';
import { SpamPage } from '../pages/spam/spam';
import { NewsPage } from '../pages/news/news';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { loadJson, loadRightLanguage } from '../lib/utils';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translate: TranslateService,
    private domSanitizer : DomSanitizer,
    private languageService: LanguageService) {
      this.initializeApp();
      // used for an example of ngFor and navigation
      this.translate.stream(['Home',
                            'Spam signal',
                            'Tips and Tricks',
                            'Videos',
                            'Games and Quiz',
                            'Password Card',
                            'News',
                            'Settings',
                            'CSWL',
                            'About'])
                    .subscribe(translations => {
        this.pages = [
          { title: translations['Home'], component: HomePage, icon: 'home'},
          { title: translations['Spam signal'], component: SpamPage, icon: 'call'},
          { title: translations['Tips and Tricks'], component: TipsTricksPage, icon: 'bulb', data:'../assets/data/tipstricks/tipstricks.json'},
          { title: translations['Videos'], component: VideosPage, icon: 'videocam'},
          { title: translations['Games and Quiz'], component: GamesQuizPage, icon: 'football', data:'../assets/data/gamesquiz/gamesquiz.json'},
          { title: translations['Password Card'], component: PasswordCardPage, icon: 'card'},
          { title: translations['News'], component: NewsPage, icon: 'paper'},
          { title: translations['Settings'], component: SettingsPage, icon: 'settings' },
          { title: translations['About'], component: AboutPage, icon: 'information-circle'},
          { title: translations['CSWL'], component: CSWLPage, icon: 'information-circle'},
        ];
      })
    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.languageService.setInitialAppLanguage();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.data!=null){
      loadJson(page.data,this.domSanitizer).then(data => { //load the data in advance
        data = loadRightLanguage(data,this.translate.currentLang);
        this.nav.setRoot(page.component, {data:data});
      });
    }
    else
      this.nav.setRoot(page.component);
  }
}
