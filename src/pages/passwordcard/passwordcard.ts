import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import randomstring from 'randomstring';

const PWD_CARDS = 'PASSWORDS_CARDS';

@Component({
  selector: 'page-passwordcard',
  templateUrl: 'passwordcard.html',
})
export class PasswordCardPage {

  options : any = 1;
  charset : any;
  cards : any = [];
  strings : any;
  name: any;
  creatingCard : any = false;
  checkingCard : any = false;
  headers : any = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {



      this.storage.get(PWD_CARDS).then(val => {
        if (val) {
          this.cards = val;
        }
        console.log(this.cards);
      });
  }

  newCard(){
    this.strings = [];
    this.name = null;
    this.creatingCard = true;
  }

  displayCard(card){
    this.checkingCard =  true;
    this.strings = card;

  }

  deleteCard(indexCard){
    this.cards.splice(indexCard,1);
    this.storage.set(PWD_CARDS, this.cards);
  }

  generateCard(){
    this.charset = 'alphanumeric';

    if (this.options == 1) {
      this.charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+@*#%&/(){}[]><=?!$,.-_:"';
    }

    for (let i = 0; i < 10; i++) {
        this.strings.push(randomstring.generate({
        length: 14,
        charset: this.charset
      }).split(''));
    }
    this.cards.push({
      name: this.name,
      strings: this.strings
    });
    this.storage.set(PWD_CARDS, this.cards);
    this.creatingCard = false;
  }

}
