import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
         LoadingController } from 'ionic-angular';

import { WeatherapiProvider } from '../../providers/weatherapi/weatherapi';
import 'rxjs/add/operator/catch';

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
    private wapi: WeatherapiProvider,public loadingCtrl: LoadingController
    ) {
    
  }

  ionViewDidLoad() {
    
  }

  inputEvent(e){
    let loading = this.loadingCtrl.create({
      content: 'Pesquisando...',
      duration:1500
    });

    loading.present();
    let _tmp = e.target.value;
    this.wapi.getapiCities(_tmp).subscribe(ret=>{      
      this.itemsFilter = [];
      this.itemsFilter.push(ret);
      //loading.dismiss();
    });

    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
 