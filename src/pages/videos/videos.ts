import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { loadJson } from '../../lib/utils';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
  videos: any;
  videosFiltered: any;
  loading: Loading;
  searchTerm : any="";

    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, private domSanitizer: DomSanitizer,) {
      loadJson('../../assets/data/videos.json',domSanitizer).then(data => {
        this.startIFrameLoadEvent();
        this.videos = data;
        this.handleIFrameLoadEvent();
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

    filterItems(searchTerm){
       return this.videos.filter((item) => {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

}
