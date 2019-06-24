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
  steps: any;
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
      });

      this.steps = [
        { title: 'Step 1', description: 'Select a row and a column', img: '../../assets/imgs/PasswordCard/Step1.png'},
        { title: 'Step 2', description: 'Select direction', img: '../../assets/imgs/PasswordCard/Step2.png'},
        { title: 'Step 3', description: 'Select at least 8 characters', img: '../../assets/imgs/PasswordCard/Step3.png'},
        { title: 'Step 4', description: 'Remember your choices', img: '../../assets/imgs/PasswordCard/Step4.png'}
      ];
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
