import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { PasswordPage } from './password/password';
import { EmailPage } from './email/email';
import { CleanWorkspacePage } from './cleanWorkspace/cleanWorkspace';
import { WebPage } from './web/web';
import { WasteManagementPage } from './wasteManagement/wasteManagement';

@Component({
  selector: 'page-tipstricks',
  templateUrl: 'tipstricks.html'
})

export class TipsTricksPage {
  selectedItem: any;

  //define the subpages
  pages: Array<{title: string, component: any, notes: string, icon: string}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.translate.stream(['Password', 'E-mail', 'Clean Workspace','Web', 'Waste Management']).subscribe(translations => {
      this.pages = [
        { title: translations['Password'], component: PasswordPage , notes: '', icon: 'arrow-dropright-circle'},
        { title: translations['E-mail'], component: EmailPage , notes: '', icon: 'arrow-dropright-circle'},
        { title: translations['Clean Workspace'], component: CleanWorkspacePage , notes: '', icon: 'arrow-dropright-circle'},
        { title: translations['Web'], component: WebPage , notes: '', icon: 'arrow-dropright-circle'},
        { title: translations['Waste Management'], component: WasteManagementPage , notes: '', icon: 'arrow-dropright-circle'}
      ];
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }
}
