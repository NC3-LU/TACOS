import { DomSanitizer } from '@angular/platform-browser';

/*
* Load a json and clean it
* @url <string> : url of the jsonData
* @sanitizer <DomSanitizer>
* @return : cleaned json
*/
export function loadJson(url: RequestInfo, sanitizer: DomSanitizer){
  let myrequests = new Request(url);
  return fetch(myrequests).then(
    data => {
        return data.json();
    }
  ).then(jsonData => {return cleanJson(jsonData, sanitizer)})
}

/*
* Clean the url fields contained in a JSON item.
* @myData: json to clean
* @sanitizer <DomSanitizer>
* @return : json
*/
export function cleanJson(myData: Array<any>, sanitizer: DomSanitizer) {
    for (let item of myData) {
        item.url = sanitizer.bypassSecurityTrustResourceUrl(item.url);
    }
    return myData;
}
