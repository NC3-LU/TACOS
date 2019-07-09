import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';

import { SettingsProvider } from './../providers/settings/settings';

import { HomePage } from '../pages/home/home';
import { TipsTricksPage } from '../pages/tipstricks/tipstricks';
import { GamesQuizPage } from '../pages/gamesquiz/gamesquiz';
import { PasswordCardPage } from '../pages/passwordcard/passwordcard';
import { VideosPage } from '../pages/videos/videos';
import { SpamPage } from '../pages/spam/spam';
import { NewsPage } from '../pages/news/news';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  selectedTheme: String;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translate: TranslateService,
    private languageService: LanguageService,
    private settings: SettingsProvider) {

      this.initializeApp();

      // used for an example of ngFor and navigation
      this.translate.stream(['Home',
                            'Tips and Tricks',
                            'Videos',
                            'Games and Quiz',
                            'Password Card',
                            'Spam signal',
                            'News',
                            'Settings',
                            'About'])
                    .subscribe(translations => {
        this.pages = [
          { title: translations['Home'], component: HomePage, icon: 'home'},
          { title: translations['Tips and Tricks'], component: TipsTricksPage, icon: 'bulb'},
          { title: translations['Videos'], component: VideosPage, icon: 'videocam'},
          { title: translations['Games and Quiz'], component: GamesQuizPage, icon: 'football'},
          { title: translations['Password Card'], component: PasswordCardPage, icon: 'card'},
          { title: translations['Spam signal'], component: SpamPage, icon: 'call'},
          { title: translations['News'], component: NewsPage, icon: 'paper'},
          { title: translations['Settings'], component: SettingsPage, icon: 'settings' },
          { title: translations['About'], component: AboutPage, icon: 'information-circle'},
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

      this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
