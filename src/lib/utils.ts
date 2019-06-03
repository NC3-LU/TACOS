/*
* Load a json and clean it
* @url <string> : url of the jsonData
* @sanitizer <DomSanitizer>
* @return : cleaned json
*/
export function loadJson(url, sanitizer){
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
export function cleanJson(myData, sanitizer) {
    for (let item of myData) {
        item.url = sanitizer.bypassSecurityTrustResourceUrl(item.url);
    }
    return myData;
}
