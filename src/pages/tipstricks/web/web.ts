import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-web',
  templateUrl: 'web.html'
})

export class WebPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

  }
}
