import { DomSanitizer } from '@angular/platform-browser';

/*
* Load a json and clean it
* @url <string> : url of the jsonData
* @sanitizer <DomSanitizer>
* @return : cleaned json
*/
export async function loadJson(url: RequestInfo, sanitizer: DomSanitizer){
  let myrequests = new Request(url);
  const data = await fetch(myrequests);
  const jsonData = await data.json();
  return cleanJson(jsonData, sanitizer);
}

/*
* Clean the url fields contained in a JSON item.
* @myData: json to clean
* @sanitizer <DomSanitizer>
* @return : json
*/
export function cleanJson(myData: Array<any>, sanitizer: DomSanitizer) {
    for (let item of myData) {
      if(item.url !=null)
        item.url = sanitizer.bypassSecurityTrustResourceUrl(item.url);
    }
    return myData;
}

/*
* Clean the url fields contained in a JSON item.
* @myData: json to clean
* @sanitizer <DomSanitizer>
* @return : array containing the subpart of JSON
*/
export function loadRightLanguage(myData: Array<any>,language: String) {
  let temp = [];
    for (let item of myData) {
        if(language == item.language)
          temp.push(item);
    }
    return temp;
}
