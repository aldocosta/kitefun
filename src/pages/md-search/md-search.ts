import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { WeatherapiProvider } from '../../providers/weatherapi/weatherapi';


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
  items = []; 
  itemsFilter = [];
  valor: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
    private wapi: WeatherapiProvider
    ) {
    
  }

  ionViewDidLoad() {
    this.items.push('São Paulo');
    this.items.push('Santos');
    this.items.push('São Vicente');
    this.items.push('Guaruja');
    this.items.push('Peruibe');
    this.items.push('Mongagua');
      
    
  }

  inputEvent(e){
    let _tmp = e.target.value;
    if(_tmp!=''){
      let tmp = this.items.filter(function(e){ return e.indexOf(_tmp)>-1});
      this.itemsFilter = tmp;    
    }else{
      this.itemsFilter = [];
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
