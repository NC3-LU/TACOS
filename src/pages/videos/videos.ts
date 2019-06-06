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
    searchLang: string="";
    searchTermForQuery: any=""; //create a var for the query => the trnansformation of inputs is transparent for users

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
        this.searchLang = translate.currentLang;
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
* Initialize the research parameters
*/
    setFilteredItems() {
      this.searchTermForQuery = this.searchTerm;
      if(typeof this.searchTermForQuery == 'string' && this.searchTermForQuery.indexOf(",") != -1)
        this.searchTermForQuery = this.searchTermForQuery.toLowerCase().split(",");

      this.videosFiltered = this.filterItems(this.searchTermForQuery,this.searchLang);
    }

/*
* Research algo, search one or severald word in the title and keywords of json videosFiltered
* @searchterm: String or Array<String>
* @searchLang: String the code of the language ("fr", etc.)
*/
     filterItems(searchTerm:any,searchLang:String=""){
       console.log(searchTerm)
       if(typeof searchTerm == 'string'){
         return this.videos.filter((item:any) => {
              return (item.language.toLowerCase().includes(searchLang.toLowerCase()) &&
              (item.keywords.find(function(element:String) {
                                  return element.toLowerCase().includes(searchTerm.toLowerCase());
                                })
              || item.title.toLowerCase().includes(searchTerm.toLowerCase()))
              );
          });
        }
      else if (Array.isArray(searchTerm)){
        return this.videos.filter((item:any) => {
             return (item.language.toLowerCase().includes(searchLang.toLowerCase()) &&
             (
               item.keywords.filter(element => searchTerm.indexOf(element) !== -1).length > 0
               ||
               searchTerm.includes(item.title.toLowerCase())
              )
             );
         });

      }
    }
}
