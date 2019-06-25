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
    loadSpamsLight(): Promise<any> {
        let http = new HTTP();
        return new Promise<any>(resolve => {
            http.get(environment.backendServicesURL, {}, {}).then((data : any) => {
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

    /*
    * Retrieve the list of recently added spam from the server.
    * @return : array of spam
    */
    // loadSpamsLight() {
    //     let http = new HTTP();
    //     // let result = [];
    //     http.get(environment.backendServicesURL, {}, {})
    //     .then(data => {
    //         //console.log(data.status);
    //         //console.log(data.data); // data received by server
    //         //console.log(data.headers);
    //         //console.log(data.data);
    //         console.log('REported spams:');
    //         let items = JSON.parse(data.data)
    //         console.log(items.objects);
    //         console.log(typeof items);
    //         return items;
    //       })
    //     .catch(error => {
    //         console.log('error');
    //         console.log(error);
    //         console.log(error.status);
    //         console.log(error.error); // error message as string
    //         console.log(error.headers);
    //         return error.error;
    //       });
    //       //return result;
    // }

}
