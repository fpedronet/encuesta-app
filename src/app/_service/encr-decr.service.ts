import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {

  constructor() { }

  set(value: string){
    var keys="1234123412ABCDEF";
    var ivs="ABCDEF1234123412";
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(ivs);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    var encryString = encrypted.toString();
    //encryString = encryString.replace(/\//g, 'bFbFb');

    return encryString;
  }

  get(value: string){
    var keys="1234123412ABCDEF";
    var ivs="ABCDEF1234123412";
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(ivs);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    var decryString = decrypted.toString(CryptoJS.enc.Utf8);
    //decryString = decryString.replace('bFbFb', '/');

    return decryString;
  }

}
