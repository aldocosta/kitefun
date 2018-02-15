import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController,Events } from 'ionic-angular';
import { AsyncPipe } from '@angular/common';

import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MdSearchPage } from '../md-search/md-search';

import { EstadoServices } from '../services/estado-services';
import { WeatherapiProvider } from '../../providers/weatherapi/weatherapi';
import { ConfigProvider } from '../../providers/config/config';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage'

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
  //slides:any[]=[];  
  selectedItem: any;
  flag:boolean;

  constructor(public navCtrl: NavController,
      			  public modalCtrl: ModalController,
      			  private geolocation: Geolocation,
              private es: EstadoServices,
              private wapi: WeatherapiProvider,
              private ev: Events,
              public loadingCtrl: LoadingController,
              private conf: ConfigProvider,
              private ls: LocalStorageProvider,
              private navParams: NavParams,
              private alertCtrl: AlertController
              ) {
              this.selectedItem = navParams.get('item');
  } 


  ngOnInit(){
    /*retornando o favorito*/    
    this.loadFavoritos();
  }

  public showModalSearchCities(){ 
    let modal = this.modalCtrl.create(MdSearchPage);
    modal.present();	
    modal.onDidDismiss(ret=>{
      this.loadFavoritos();      
    });
  }

  public check(item){    
    if(item.favorito){
      this.config.cidades.push({nome:item.nome,favorito:item.favorito,urlapi:item.urlapi});
    }
    else{
      let index = this.config.cidades.map((a,b)=>{        
      });      
    }
  }

   private tapevent(e){
    this.flag=false;
    this.loadInfo(e);
   }

   private loadFavoritos(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando favoritos'
    });

    loading.present();

    try
    {
      let fav = this.ls.getItem('favoritos');
      
      let index = fav.map(function(e){
        return e.favorito
      }).indexOf(true);

      let city = fav[index];

      // let ret_ = fav.map(function(e){
      //   if(e.favorito){
      //     return e;
      //   }        
      // });

      this.cidade = '';

      if(this.selectedItem){
         this.cidade = this.selectedItem.cidade;
         this.flag = this.selectedItem.favorito;
      }else{
        if(city){
          this.cidade = city.cidade;
          this.flag = true;
        }
      }
        
      if(this.cidade){
        this.wapi.getapiCities(this.cidade).subscribe(ret=>{
          this.temp_min = ret.temp_min;
          this.temp_max = ret.temp_max;
          this.speed = ret.speed;      
          this.cidade = ret.name;
          this.message = ret.message;
          this.urlicon = ret.urlicon;      
          this.temp = ret.temp;
          this.deg = ret.deg;
          this.main = ret.main;
          this.isfirsttime = false;
          loading.dismiss();
          this.wapi.getapiflickr_lat_lon(ret.lat,ret.lon).subscribe(ret=>{
            this.urlimg = ret.source;        
          });          
        },err=>{
          loading.dismiss();
          console.log(err);
        });
      }else{
        loading.dismiss();
      }
    }catch(ex){
      loading.dismiss();
      console.log(ex);
    }
   }

  private loadInfo(infiniteScroll){
    let loading = this.loadingCtrl.create({
      content: 'Carregando dados do tempo...'
    });
    
   loading.present();
   this.conf.retornarConfig('configuracoes').then((data)=>{
     this.config =  data as { cidades:Array<{nome:string,favorito:boolean,urlapi:string}> };
     this.isfirsttime = false; 
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

  favoritarItem(){
    if(this.cidade){
      let fav = this.ls.getItem('favoritos');
      let d = [] = fav;
      d.forEach(element => {
        element.favorito = false;
      });

      let ret = fav.map(function(e){
        return e.cidade;
      }).indexOf(this.cidade);

      let obj = {lon:'',lat:'',cidade:'',favorito:false}

      if(ret>-1){
        obj = fav[ret];
        obj.favorito=true;
      }else{        
        obj.lon = '';
        obj.lat = '';
        obj.cidade = this.cidade;
        obj.favorito = true;        
        fav.push(obj);
      }
      
      this.ls.saveItem('favoritos',fav);      

      let alert = this.alertCtrl.create({
        title: 'Novo Favorito!',
        subTitle: '"Favoritado" com sucesso!',
        buttons: ['OK']
      });
      alert.present();          
    }
  }

  // refresh(){
  //   if(this.selectedItem){

  //   }
  // }
}