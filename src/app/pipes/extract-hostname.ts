import {Pipe, Injectable} from '@angular/core';
import { extractDomain } from '../../lib/utils';

@Pipe({
  name: 'extractHostname'
})
@Injectable()
export class ExtractHostname {
    transform(value, args) {
        return extractDomain(value);
    }
}
