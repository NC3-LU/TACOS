import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { TipsTricksPage } from '../pages/tipstricks/tipstricks';
import { VideosPage } from '../pages/videos/videos';
import { SpamPage } from '../pages/spam/spam';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translate: TranslateService,
    private languageService: LanguageService) {
      this.initializeApp();
      // used for an example of ngFor and navigation
      this.translate.stream(['Home', 'Tips and Tricks', 'Videos','Settings']).subscribe(translations => {
        this.pages = [
          { title: translations['Home'], component: HomePage },
          { title: translations['Tips and Tricks'], component: TipsTricksPage },
          { title: translations['Videos'], component: VideosPage },
          { title: 'Spam signal', component: SpamPage },
          { title: translations['Settings'], component: SettingsPage }
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
    this.nav.setRoot(page.component);
  }
}
