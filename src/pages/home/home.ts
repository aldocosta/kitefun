import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { MdSearchPage } from '../md-search/md-search';

import { EstadoServices } from '../services/estado-services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	latitude:String;
	longitude:String;

  constructor(public navCtrl: NavController,
  			  public modalCtrl: ModalController,
  			  private geolocation: Geolocation,
          private es: EstadoServices) {
  }

  public showModalSearchCities(){ 
    let modal = this.modalCtrl.create(MdSearchPage);
    modal.present();	
  }

  public doSome(){
    this.es.getEstadoCidade().subscribe(function(ret){
      this.longitude =ret;
    });    
  }
}