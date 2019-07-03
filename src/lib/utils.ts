import { DomSanitizer } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';


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


/*
* Make an array distinct (with unique elements).
* @arr <string> : array to make distinct
* @attr <string> : attr, the attribute to use to make the array distinct
* @return : array with unique elements
*/
export function arrayDistinct(arr, attr) {
    const result = [];
    const map = new Map();
    for (const item of arr) {
        if(!map.has(item[attr])){
            map.set(item[attr], true);
            result.push(item);
        }
    }
    return result;
}


/*
* Fetch the content at url.
* @url <string> : the url to retrieve
* @return : the data at the url
*/
export function fetchURL(url): Promise<any> {
    let http = new HTTP();
    return new Promise<any>(resolve => {
        http.get(url, {}, {}).then((data : any) => {
            resolve(data.data);
        }).catch((error : any) => {
            console.log(error);
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
            resolve({});
        });
    });
}


/*
* Extract the domain of a url. Example:
*  extractDomain('https://www.cases.lu') -> cases.lu
* @url <string> : the url of the domain to extract
* @return : the domain name
*/
export function extractDomain(url) {
    let domain = '';
    // find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    // find & remove www
    if (domain.indexOf("www.") > -1) {
        domain = domain.split('www.')[1];
    }

    domain = domain.split(':')[0]; //find & remove port number
    domain = domain.split('?')[0]; //find & remove url params

    return domain;
}
