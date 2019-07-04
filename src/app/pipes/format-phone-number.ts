import {Pipe, Injectable} from '@angular/core';
import libphonenumber from 'google-libphonenumber';

@Pipe({
  name: 'formatPhoneNumber'
})
@Injectable()
export class FormatPhoneNumber {
    transform(value, args) {
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        const number = phoneUtil.parseAndKeepRawInput(value, 'LU');
        const PNF = libphonenumber.PhoneNumberFormat;
        return phoneUtil.format(number, PNF.INTERNATIONAL);
    }
}
