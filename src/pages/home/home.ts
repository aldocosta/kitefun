import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController,Events } from 'ionic-angular';
import { AsyncPipe } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation';

import { MdSearchPage } from '../md-search/md-search';

import { EstadoServices } from '../services/estado-services';
import { WeatherapiProvider } from '../../providers/weatherapi/weatherapi';
import { ConfigProvider } from '../../providers/config/config';

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
  deg:string;
  main:string;
  isfirsttime:boolean=true;
  urlimg:string;
  config: {
      cidades:Array<{nome:string,favorito:boolean,urlapi:string}>
  }
  slides:any[]=[];  

  constructor(public navCtrl: NavController,
      			  public modalCtrl: ModalController,
      			  private geolocation: Geolocation,
              private es: EstadoServices,
              private wapi: WeatherapiProvider,
              private ev: Events,
              public loadingCtrl: LoadingController,
              private conf: ConfigProvider
              ) {   

  } 


  ngOnInit(){
    /*retornando o favorito*/
    this.loadInfo(null);
  }

  public showModalSearchCities(){ 
    let modal = this.modalCtrl.create(MdSearchPage);
    modal.present();	
  }

  public check(item){
    console.log(item);
    if(item.favorito){
      this.config.cidades.push({nome:item.nome,favorito:item.favorito,urlapi:item.urlapi});
    }
    else{
      let index = this.config.cidades.map((a,b)=>{
        console.log(a);
        console.log(b);
      });      
    }
  }

   private tapevent(e){
    this.loadInfo(e);
   }

  private loadInfo(infiniteScroll){
    // this.slides.push({nome:'Santos',favorito:false,urlapi:'http://aldocosta-com-br.umbler.net/api/cidade/santos',img:'https://farm4.staticflickr.com/3944/15542230306_a79a173e12_n.jpg'});
    // this.slides.push({nome:'São Paulo',favorito:false,urlapi:'http://aldocosta-com-br.umbler.net/api/cidade/São Paulo',img:'./assets/rio.jpg'});    
    // this.slides.push({nome:'Rio de Janeiro',favorito:false,urlapi:'http://aldocosta-com-br.umbler.net/api/cidade/Rio de Janeiro',img:'./assets/saopaulo.jpg'});
 
    let loading = this.loadingCtrl.create({
      content: 'Carregando dados do tempo...'
    });

    
   loading.present();
   this.conf.retornarConfig('configuracoes').then((data)=>{
     this.config =  data as { cidades:Array<{nome:string,favorito:boolean,urlapi:string}> };
     this.isfirsttime = false; //this.config.cidades[0].urlapi=='';
   }).then((somedata)=>{
     
     console.log(this.config.cidades.length);
      this.geolocation.getCurrentPosition().then((resp) => {
        this.wapi.getapilat_lon(resp.coords.latitude,resp.coords.longitude).subscribe(ret=>{
          this.temp_min = ret.temp_min;
          this.temp_max = ret.temp_max;
          this.speed = ret.speed;      
          this.cidade = ret.name;
          this.message = ret.message;
          this.urlicon = ret.urlicon;      
          this.temp = ret.temp;
          this.deg = ret.deg;
          this.main = ret.main;
          loading.dismiss();
        });

        this.wapi.getapiflickr_lat_lon(resp.coords.latitude,resp.coords.longitude).subscribe(ret=>{
          this.urlimg = ret.source;
          console.log(ret);
        });

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

  }
}