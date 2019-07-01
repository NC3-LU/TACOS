import { Component } from '@angular/core';

import {
    Loading,
    LoadingController,
    AlertController,
    ToastController } from 'ionic-angular';

import * as Parser from 'rss-parser';

import { fetch } from '../../lib/utils';
import { UtilsService } from './utils';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
    loading: Loading;
    feeds_sets: any[];
    items: any[];

    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public utils: UtilsService) {

        this.feeds_sets = [];
        this.items = [];

        this.utils.loadNews()
        .then((result)=>{
            this.feeds_sets = result;
            this.loadSlide(0);
        })
        .catch((err)=>{
            console.log("Error when retrieving list of news.");
        });

    }


    /*
    * Refresh the feeds on slide change.
    */
    onSlideDidChange(slides) {
        this.items = [];
        let slidesIndex = 0;
        try {
            slidesIndex = slides.getActiveIndex();
        } catch {
            slidesIndex = 0;
        }
        // this.loadSlide(slidesIndex);
        this.loadSlide(slidesIndex);
    }

    /*
    * Load the slide at the specified index.
    */
    async loadSlide(index) {
        this.items = [];
        let tmpItems = [];
        let parser = new Parser();



        this.feeds_sets[index].feeds.map(function(feed) {

            fetch(feed.link).then((response) => {
                    console.log(feed.link);

                    parser.parseString(response).then((val)=>{

                        console.log(val.title);
                        val.items.forEach(item => {
                             console.log(item.title)
                             tmpItems.push(item);
                        });

                    });



            })
            .catch((err)=>{
                console.log("Error when parsing feed.");
            });
        });

        this.items = tmpItems;



    }

    itemSelected(event) {
        console.log(event);
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
