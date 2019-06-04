import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { LanguageService } from '../services/language.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TipsTricksPage } from '../pages/tipstricks/tipstricks';
import { VideosPage } from '../pages/videos/videos';
import { PasswordPage } from '../pages/tipstricks/password/password';
import { EmailPage } from '../pages/tipstricks/email/email';
import { CleanWorkspacePage } from '../pages/tipstricks/cleanWorkspace/cleanWorkspace';
import { WebPage } from '../pages/tipstricks/web/web';
import { WasteManagementPage } from '../pages/tipstricks/wasteManagement/wasteManagement';
import { SettingsPage } from '../pages/settings/settings';


import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

export function createTranslateLoader(http: HttpClient) {
	return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TipsTricksPage,
    VideosPage,
    PasswordPage,
    EmailPage,
    CleanWorkspacePage,
    WebPage,
    WasteManagementPage,
		SettingsPage,
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
    PasswordPage,
    EmailPage,
    CleanWorkspacePage,
    WebPage,
    WasteManagementPage,
		SettingsPage
  ],
  providers: [
    StatusBar,
    LanguageService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
