import {Pipe, Injectable} from '@angular/core';

@Pipe({
  name: 'extractHostname'
})
@Injectable()
export class ExtractHostname {
    transform(value, args) {
        return this.extractDomain(value);
    }

    extractDomain(url) {
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
}
