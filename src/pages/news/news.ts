import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
    Loading,
    AlertController } from 'ionic-angular';

import * as Parser from 'rss-parser';

import { fetchURL } from '../../lib/utils';
import { UtilsService } from './utils';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
    loading: Loading;
    feeds_sets: any[];
    items: any[];
    selectedNews: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public utils: UtilsService) {

        this.feeds_sets = [];
        this.items = [];

        this.selectedNews = navParams.get('newsItem');
        if (!this.selectedNews){
            this.utils.loadNews()
            .then((result)=>{
                result.sort(function(set1, set2){
                    return set1.ui_position - set2.ui_position;
                });
                this.feeds_sets = result;
                this.loadSlide(0);
            })
            .catch((err)=>{
                console.log("Error when retrieving list of news.");
            });
        }
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
    * Load the feeds of slide at the specified index.
    */
    async loadSlide(index) {
        this.items = [];
        let tmpItems = [];
        let parser = new Parser();
        this.feeds_sets[index].feeds.map(function(feed) {
            fetchURL(feed.link).then((response) => {
                    parser.parseString(response).then((val)=>{
                        val.items.forEach(item => {
                             tmpItems.push(item);
                        });
                    });
            })
            .catch((err)=>{
                console.log("Error when retrieving feed.");
            });
        });
        this.items = tmpItems;
    }

    /*
    * Display the selected news.
    */
    itemSelected(item) {
        this.navCtrl.push(NewsPage, {newsItem:item});
    }
}
