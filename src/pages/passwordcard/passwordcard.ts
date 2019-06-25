import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import randomstring from 'randomstring';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

const PWD_CARDS = 'PASSWORDS_CARDS';

@Component({
  selector: 'page-passwordcard',
  templateUrl: 'passwordcard.html',
})
export class PasswordCardPage {

  createCard:FormGroup;
  name:AbstractControl;
  options:AbstractControl;

  //options : any = 1;
  charset : any;
  cards : any = [];
  steps: any;
  strings : any;
  creatingCard : any = false;
  checkingCard : any = false;
  headers : any = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder:FormBuilder,
    private translate: TranslateService,
    private storage: Storage) {

      this.storage.get(PWD_CARDS).then(val => {
        if (val) {
          this.cards = val;
        }
      });

      this.translate.stream(['Step 1','Step 2', 'Step 3', 'Step 4',
                            'Select a row and a column',
                            'Select direction',
                            'Select at least 8 characters',
                            'Remember your choices'])
                    .subscribe(translations => {
          this.steps = [
            { title: translations['Step 1'], description: translations['Select a row and a column'], img: '../../assets/imgs/PasswordCard/Step1.png'},
            { title: translations['Step 2'], description: translations['Select direction'], img: '../../assets/imgs/PasswordCard/Step2.png'},
            { title: translations['Step 3'], description: translations['Select at least 8 characters'], img: '../../assets/imgs/PasswordCard/Step3.png'},
            { title: translations['Step 4'], description: translations['Remember your choices'], img: '../../assets/imgs/PasswordCard/Step4.png'}
          ];
      });
  }

  newCard(){
    this.createCard = this.formbuilder.group({
      name:['',Validators.required],
      options:[true]
    });

    this.name = this.createCard.controls['name'];
    this.options = this.createCard.controls['options'];
    this.strings = [];
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

    if (this.options) {
      this.charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+@*#%&/(){}[]><=?!$,.-_:"';
    }

    for (let i = 0; i < 10; i++) {
        this.strings.push(randomstring.generate({
        length: 14,
        charset: this.charset
      }).split(''));
    }
    console.log(this.name)
    this.cards.push({
      name: this.name.value,
      strings: this.strings
    });
    this.storage.set(PWD_CARDS, this.cards);
    this.creatingCard = false;
  }

}
