import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-wasteManagement',
  templateUrl: 'wasteManagement.html'
})
export class WasteManagementPage {
  selectedItem: any;
  categories: string[];
  notes: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.categories = ['Password', 'E-mail', 'Clean workspace', 'Web', 'Waste Management'];
    this.notes = ['Manage your password', 'Securely use your emails','','','Destroy properly your informations'];

    this.items = [];
    for (let i = 0; i < this.categories.length; i++) {
      this.items.push({
        title: this.categories[i],
        note: this.notes[i],
        icon: 'arrow-dropright-circle'
      });
    }
  }

}
