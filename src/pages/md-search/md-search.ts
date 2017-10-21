import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MdSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-md-search',
  templateUrl: 'md-search.html',
})
export class MdSearchPage {
  items = [] ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    
  }

  ionViewDidLoad() {
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Cubatão');
    //console.log('ionViewDidLoad MdSearchPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
