import {Injectable} from "@angular/core";
import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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
                resolve("ServiceError");
            });
        });
    }

}
