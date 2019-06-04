import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
    videos: any;
    videosFiltered: any;
    loading: Loading;
    searchTerm : any="";

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private domSanitizer: DomSanitizer,) {
        this.loadVideos().then(data => {
            this.startIFrameLoadEvent();
            this.videos = data;
            this.cleanJson(this.videos);
            this.handleIFrameLoadEvent();
            this.setFilteredItems();
        });
    }
/*
* Load the JSON
*/
    loadVideos(){
      let myrequests = new Request('../../assets/data/videos.json');
      return fetch(myrequests).then(
        data => {return data.json()}
      )
    }
/*
* Clean the URL
*/
    cleanJson(myData): void {
        for (let item of myData) {
            item.url = this.domSanitizer.bypassSecurityTrustResourceUrl(item.url);
        }
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
