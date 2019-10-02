import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { LanguageService } from '../services/language.service';
import { ThemeService } from '../services/theme.service';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { TACOSApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TipsTricksPage } from '../pages/tipstricks/tipstricks';
import { VideosPage } from '../pages/videos/videos';
import { CSWLPage } from '../pages/cswl/cswl';
import { GamesQuizPage } from '../pages/gamesquiz/gamesquiz';
import { PasswordCardPage } from '../pages/passwordcard/passwordcard';
import { SpamPage } from '../pages/spam/spam';
import { NewsPage } from '../pages/news/news';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { findVulnerabilitiesPage } from '../pages/gamesquiz/findvulnerabilities/findvulnerabilities';
import { phishOrNotPage } from '../pages/gamesquiz/phishornot/phishornot';


import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CacheModule } from "ionic-cache";
import { Network } from '@ionic-native/network/ngx';
import {NgxPaginationModule} from 'ngx-pagination';

import { ExtractHostname } from './pipes/extract-hostname';
import { FormatPhoneNumber } from './pipes/format-phone-number';

import { WindowRefService } from './window-ref.service';

export function createTranslateLoader(http: HttpClient) {
	return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

@NgModule({
  declarations: [
    TACOSApp,
    HomePage,
    TipsTricksPage,
    VideosPage,
		GamesQuizPage,
		PasswordCardPage,
    SpamPage,
    NewsPage,
		SettingsPage,
    AboutPage,
		findVulnerabilitiesPage,
		phishOrNotPage,
		CSWLPage,
    ExtractHostname,
    FormatPhoneNumber
  ],
  imports: [
    BrowserModule,
		NgxPaginationModule,
    HttpClientModule,
		CacheModule.forRoot(),
    IonicModule.forRoot(TACOSApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TACOSApp,
    HomePage,
    SpamPage,
    TipsTricksPage,
    VideosPage,
		GamesQuizPage,
		PasswordCardPage,
    NewsPage,
		SettingsPage,
		CSWLPage,
    AboutPage,
		findVulnerabilitiesPage,
		phishOrNotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
		InAppBrowser,
		File,
    LanguageService,
    ThemeService,
    AppVersion,
    SocialSharing,
    Network,
		WindowRefService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
