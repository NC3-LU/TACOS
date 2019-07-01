import {Injectable} from "@angular/core";
import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    readonly fallback_feeds = {
        "nb_results": 2,
        "objects": [
            {
                "title": "CASES World feed", "description": "Feeds from all other the world proposed by CASES Luxembourg.",
                "feeds": [{"title": "CSO online", "description": "CSO online", "language": "en", "link": "https://www.csoonline.com/index.rss"}, {"title": "Krebs on Security", "description": "Krebs on Security", "language": "en", "link": "https://krebsonsecurity.com/feed/"}, {"title": "A Few Thoughts on Cryptographic Engineering", "description": "A Few Thoughts on Cryptographic Engineering", "language": "en", "link": "https://blog.cryptographyengineering.com/feeds/posts/default"}]
            },
            {"title": "CASES feed", "description": "Feeds proposed by CASES Luxembourg.",
                "feeds": [{"title": "BEE Secure", "description": "Bee Secure feed", "language": "de", "link": "https://www.bee-secure.lu/de/rss/news"}]
            }
        ]
    };


    constructor() {
    }


    /*
    * Retrieve the list of recently added spam from the server.
    * @return : array of spam
    */
    loadNews(): Promise<any> {
        let http = new HTTP();
        return new Promise<any>(resolve => {
            http.get(environment.backendServicesURL + 'feeds_sets', {}, {}).then((data : any) => {
                let jsonData = JSON.parse(data.data)
                resolve(jsonData.objects);
            }).catch((error : any) => {
                console.log(error);
                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);
                resolve(this.fallback_feeds.objects);
            });
        });
    }

}
