import { Component } from '@angular/core';

import {
    Loading,
    LoadingController,
    AlertController,
    ToastController } from 'ionic-angular';

import { UtilsService } from './utils';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
    loading: Loading;
    feeds_sets: any[];

    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public utils: UtilsService) {

        this.feeds_sets = [];

        this.utils.loadNews()
        .then((result)=>{

            this.feeds_sets = result;
            console.log(this.feeds_sets);

        })
        .catch((err)=>{
            console.log("Error when retrieving list of news.");
        });

    }


    /*
    * Manage loading
    */
    handleIFrameLoadEvent(): void {
        this.loading.dismiss();
    }


    startIFrameLoadEvent(): void {
      this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      this.loading.present();
    }
}
