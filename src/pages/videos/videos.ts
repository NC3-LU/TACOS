import { Component } from '@angular/core';
import { Loading, LoadingController, NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html'
})
export class VideosPage {
  videos: any
  loading: Loading;

    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, private domSanitizer: DomSanitizer,) {
      this.loadVideos().then(data => {
        this.startIFrameLoadEvent();
        this.videos = data;
        this.cleanJson(this.videos);
        this.handleIFrameLoadEvent();
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
}
