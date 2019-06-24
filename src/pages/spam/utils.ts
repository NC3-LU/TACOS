import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '../../../environments/environment';

/*
* Retrieve the list of recently added spam from the server.
* @return : array of spam
*/
export function loadSpamsLight() {
    let http = new HTTP();
    let result = [];

    http.get(environment.backendServicesURL, {}, {})
    .then(data => {
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);
        result = data.data;
      })
    .catch(error => {
        console.log('error');
        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        result = error.error;
      });
      return result;
}
