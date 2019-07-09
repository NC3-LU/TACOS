import {Injectable} from "@angular/core";
import { HTTP } from '@ionic-native/http/ngx';

import jsSHA from 'jssha'
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
            http.get(environment.backendServicesURL + 'spams', {}, {}).then((data : any) => {
                let jsonData = JSON.parse(data.data);
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

    reportSpam(phoneNumber: string, spamType: string) {
        let shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(phoneNumber);
        // console.log(shaObj.getHash("HEX"));
        // HTTP post request

        let data = {
            'number_hash': shaObj.getHash("HEX"),
            'category': spamType,
            'source': 'TACOS-Android-App'
        }

        return new Promise<any>(resolve => {
            let http = new HTTP();
            http.post(environment.backendServicesURL + 'spams', data, {}).then((result : any) => {
                console.log(result);
                resolve(result);
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
