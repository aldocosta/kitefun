import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,
         LoadingController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { WeatherapiProvider } from '../../providers/weatherapi/weatherapi';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage'
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
    private wapi: WeatherapiProvider,public loadingCtrl: LoadingController, private ls:LocalStorageProvider,
    public alertCtrl: AlertController
    ) {    
  }

  ionViewDidLoad() {    
  }

  inputEvent(e){    
    if(e.target.value.length<3) return;
    // let loading = this.loadingCtrl.create({
    //   content: 'Pesquisando...',
    //   duration:1500
    // });

    //loading.present();
    let _tmp = e.target.value;
    // this.wapi.getapiCities(_tmp).subscribe(ret=>{      
    //   this.itemsFilter = [];
    //   this.itemsFilter.push(ret);
    //   //loading.dismiss();
    // });

    let state = this.wapi.getapiCities(_tmp).
    subscribe(ret=>{      
      this.itemsFilter = [];
      this.itemsFilter.push(ret);
      //loading.dismiss();
    },err =>{
      console.log(err);
    });    
  }

  adicionar(item){
    let obj = {
      lon:item.lon,
      lat:item.lat,
      cidade:item.name,
      favorito:false
    }

    let fav = this.ls.getItem('favoritos');
    if(!fav){
      fav = [];
      //primeiro item ja favorita
      obj.favorito=true;
    }

    let ret = fav.map(function(e){
      return e.cidade;
    }).indexOf(item.name);

    if(ret <= -1){
      fav.push(obj);
      this.ls.saveItem('favoritos',fav);
      let alert = this.alertCtrl.create({
        title: 'Novo Item!',
        subTitle: 'Uma nova cidade foi adicionada',
        buttons: ['OK']
      });
      alert.present();    
    }else{
      let alert = this.alertCtrl.create({
        title: 'Novo Item!',
        subTitle: 'Item já existe',
        buttons: ['OK']
      });
      alert.present();    
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}