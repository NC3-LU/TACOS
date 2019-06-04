import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { loadJson } from '../../../lib/utils';

@Component({
  selector: 'page-password',
  templateUrl: 'password.html'
})
<<<<<<< HEAD

export class PasswordPage {
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

=======
export class PasswordPage {
  article:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer,) {
    loadJson('../../assets/data/tipstricks/password.json',domSanitizer).then(data => {
      this.article = data;
      console.log(this.article)
    });

>>>>>>> 3bc91b67919b89ca39db9ac91d6ffff4bc2cadf5
  }
}
