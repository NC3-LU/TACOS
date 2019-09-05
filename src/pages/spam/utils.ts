import {Injectable} from "@angular/core";
import { HTTP } from '@ionic-native/http/ngx';

import jsSHA from 'jssha'
import { SpamService } from '../../services/spam.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    constructor(
        private spamService: SpamService) {
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
        phoneNumber = phoneNumber.replace(/\s/g, '');
        shaObj.update(phoneNumber);

        let data = {
            'number_hash': shaObj.getHash("HEX"),
            'category': spamType,
            'source': 'TACOS-Android-App'
        }

        this.spamService.getSpamSendClear().then(sendInClear => {
            if (sendInClear) {
                data['number'] = phoneNumber;
                console.log(data['number']);
            }

            return new Promise<any>(resolve => {
                let http = new HTTP();
                http.post(environment.backendServicesURL + 'spams', data, {}).then((result : any) => {
                    resolve(result);
                }).catch((error : any) => {
                    console.log(error);
                    console.log(error.status);
                    console.log(error.error); // error message as string
                    console.log(error.headers);
                    resolve("ServiceError");
                });
            });
        });
    }


    searchSpam(phoneNumber: string) {
        let shaObj = new jsSHA("SHA-512", "TEXT");
        phoneNumber = phoneNumber.replace(/\s/g, '');
        shaObj.update(phoneNumber);

        let data = {
            'number_hash': shaObj.getHash("HEX")
        }

        return new Promise<any>(resolve => {
            let http = new HTTP();
            http.get(environment.backendServicesURL + 'spams', data, {}).then((result : any) => {
                let jsonData = JSON.parse(result.data);
                resolve(jsonData.nb_results);
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
