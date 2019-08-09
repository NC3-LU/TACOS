import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Loading, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { SocialSharing } from '@ionic-native/social-sharing';
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
        private translate: TranslateService,

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
    loadSlide(index) {
        this.items = [];
        let tmpItems = [];
        let parser = new Parser();
        // Retrieves the RSS/ATOM feeds from the selected set
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
        // Update the list of news
        this.items = tmpItems;
        // Sort articles per pubDate
        // tmpItems.sort(function(item1, item2){
        //     return item1.pubDate - item2.pubDate;
        // });
    }


    /*
    * Share a news with the system capacity (social networks, emails, SMS, etc.).
    */
    regularShare(item){
        this.translate.stream(['I found an interesting article with the CASES mobile application (https://tacos.cases.lu):'])
        .subscribe(translations => {
            let msg = translations['I found an interesting article with the CASES mobile application (https://tacos.cases.lu):']
                        + '\n\n' + item.link;
            SocialSharing.share(msg, null, null, null);
        });
    }


    /*
    * Display the selected news.
    */
    itemSelected(item) {
        this.navCtrl.push(NewsPage, {newsItem:item});
    }
}
