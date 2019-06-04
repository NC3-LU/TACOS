import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { LanguageService } from '../services/language.service';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TipsTricksPage } from '../pages/tipstricks/tipstricks';
import { VideosPage } from '../pages/videos/videos';
import { SettingsPage } from '../pages/settings/settings';
import { SpamPage } from '../pages/spam/spam';


import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { CallLog } from '@ionic-native/call-log/ngx';

export function createTranslateLoader(http: HttpClient) {
	return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TipsTricksPage,
    VideosPage,
		SettingsPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
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
    MyApp,
    HomePage,
    TipsTricksPage,
    VideosPage,
		SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallLog,
    LanguageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
