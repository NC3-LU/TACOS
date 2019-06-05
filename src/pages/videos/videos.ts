import { Component } from '@angular/core';
import { Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { loadJson } from '../../lib/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
    videos: any;
    videosFiltered: any;
    loading: Loading;
    searchTerm : any="";

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public navParams: NavParams,
                private domSanitizer: DomSanitizer,
                private translate: TranslateService,) {
      loadJson('../../assets/data/videos.json',domSanitizer).then(data => {
        this.startIFrameLoadEvent();
        this.videos = data;
        this.handleIFrameLoadEvent();
        if(navParams.get('searchTerm'))
          this. searchTerm = navParams.get('searchTerm');
        this.setFilteredItems();
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
/*
* Manage search
*/
    setFilteredItems() {
        this.videosFiltered = this.filterItems(this.searchTerm);
    }

    filterItems(searchTerm:String,searchLang:String=""){
       return this.videos.filter((item) => {
            return (item.language.toLowerCase().includes(searchLang.toLowerCase()) &&
            (item.keywords.toLowerCase().includes(searchTerm.toLowerCase()) || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
    }

}
