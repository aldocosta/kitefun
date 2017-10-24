import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController,Events } from 'ionic-angular';
import { AsyncPipe } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation';

import { MdSearchPage } from '../md-search/md-search';

import { EstadoServices } from '../services/estado-services';
import { WeatherapiProvider } from '../../providers/weatherapi/weatherapi';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	latitude:String;
	longitude:String;
  previsao: any;
  temp_min: any;
  temp_max: any;
  speed: any;
  cidade: string;
  message: string;
  urlicon:string;
  temp:any;
  latlon:any;

  constructor(public navCtrl: NavController,
      			  public modalCtrl: ModalController,
      			  private geolocation: Geolocation,
              private es: EstadoServices,
              private wapi: WeatherapiProvider,
              private ev: Events,
              public loadingCtrl: LoadingController) {
    
    /*this.ev.subscribe('favorito',(data)=>{
      this.previsao = data;
      console.log(data);
    });*/
  }
  


  ngOnInit(){
    /*retornando o favorito*/
    this.loadInfo(null);
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

  private loadInfo(infiniteScroll){
   let loading = this.loadingCtrl.create({
      content: 'Carregando dados do tempo...'
    });

   loading.present()

    this.geolocation.getCurrentPosition().then((resp) => {
      
      

    this.wapi.getapilat_lon(resp.coords.latitude,resp.coords.longitude).subscribe(ret=>{
      this.temp_min = ret.temp_min;
      this.temp_max = ret.temp_max;
      this.speed = ret.speed;      
      this.cidade = ret.name;
      this.message = ret.message;
      this.urlicon = ret.urlicon;      
      this.temp = ret.temp;
      loading.dismiss();


      if(infiniteScroll)
        infiniteScroll.complete();

    });        


    }).catch((error) => {
      console.log('Error getting location', error);
    });



/*    this.wapi.getapilat_lon(null).subscribe(ret=>{
      this.temp_min = ret.temp_min;
      this.temp_max = ret.temp_max;
      this.speed = ret.speed;      
      this.cidade = ret.name;
      this.message = ret.message;
      this.urlicon = ret.urlicon;      
      this.temp = ret.temp;
      loading.dismiss();


      if(infiniteScroll)
        infiniteScroll.complete();

    });   */     
  }
}