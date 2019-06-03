import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public language : string;
  public languages : string[];


  constructor(
    public navCtrl: NavController,
    private translate: TranslateService) {

      this.language = this.translate.currentLang;
      this.languages = ['en','fr','de'];
  }

  public languageChange() : void
  {
    
    this.translate.use(this.language);
  }

}
