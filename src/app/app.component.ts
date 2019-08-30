import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { DomSanitizer } from '@angular/platform-browser';

import { LanguageService } from '../services/language.service';
import { ThemeService } from '../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { CacheService } from "ionic-cache";
import { Network } from '@ionic-native/network/ngx';

import { SettingsProvider } from './../providers/settings/settings';

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
export class TACOSApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: any;
  today:any = new Date();
  dateEndCSWL: any = new Date(2019,11,26);

  selectedTheme: String;
  theme:String = 'default-theme';

  constructor(
    public platform: Platform,
    public alert: AlertController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public event: Events,
    private translate: TranslateService,
    private domSanitizer : DomSanitizer,
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: Storage,
    private cache: CacheService,
    private network: Network) {

        this.initializeApp();

        this.cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour


        this.translate
        .stream(['Home',
                'Tips and Tricks',
                'Videos',
                'Games and Quiz',
                'Password Card',
                'Spam signal',
                'News',
                'Settings',
                'Cybersecurity Week 2019',
                'About'])
        .subscribe(translations => {
            this.pages = [
                { title: translations['Home'], component: HomePage, icon: 'home'},
                { title: translations['Tips and Tricks'], component: TipsTricksPage, icon: 'bulb', data:'../assets/data/tipstricks/tipstricks.json'},
                { title: translations['Videos'], component: VideosPage, icon: 'videocam'},
                { title: translations['Games and Quiz'], component: GamesQuizPage, icon: 'football', data:'../assets/data/gamesquiz/gamesquiz.json'},
                { title: translations['Password Card'], component: PasswordCardPage, icon: 'card'},
                { title: translations['Spam signal'], component: SpamPage, icon: 'call'},
                { title: translations['News'], component: NewsPage, icon: 'paper'},
                { title: translations['Settings'], component: SettingsPage, icon: 'settings'},
                { title: translations['About'], component: AboutPage, icon: 'information-circle'},
            ];

            if (this.today.getTime() < this.dateEndCSWL.getTime()) {
                this.pages.splice(6,0,{ title: translations['Cybersecurity Week 2019'], component: CSWLPage, icon: 'calendar'});
            }
        });
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // The platform is ready and plugins are available.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.languageService.setInitialAppLanguage();
            this.themeService.setInitialAppTheme();

            // watch network for a disconnection
            this.network.onDisconnect().subscribe(() => {
                this.storage.set('offline', true);
                console.log('offline');
            });
            // watch network for a connection
            this.network.onConnect().subscribe(() => {
                this.storage.set('offline', false);
                console.log('online');
            });
            // subscribes to theme changing
            this.event.subscribe('theme:change', () => {
                this.changeTheme();
            });

            // watch system back button
            this.platform.registerBackButtonAction(() => {
                if (this.nav && this.nav.canGoBack()) {
                    this.nav.pop();
                } else if (this.nav.getActive().component === HomePage) {
                    let alert = this.alert.create({
                        title: this.translate.instant('Exit confirmation'),
                        subTitle: this.translate.instant('Do you want to exit the app?'),
                        buttons: [
                            {
                                text: this.translate.instant('No'),
                                role: 'cancel',
                                handler: () => {}
                            },
                            {
                                text: this.translate.instant('Yes'),
                                role: 'ok',
                                handler: () => {
                                    this.platform.exitApp();
                                }
                            }
                        ]
                    });
                    alert.present();
                } else {
                    this.nav.setRoot(HomePage);
                }
            });
        });
    }

    changeTheme() {
        this.storage.get('SELECTED_THEME').then(val => {
            this.theme = val;
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.data!=null) {
            loadJson(page.data,this.domSanitizer).then(data => { //load the data in advance
                data = loadRightLanguage(data,this.translate.currentLang);
                this.nav.setRoot(page.component, {data:data});
            });
        } else {
            this.nav.setRoot(page.component);
        }
    }
}
