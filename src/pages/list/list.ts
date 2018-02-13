import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Nav } from 'ionic-angular';

import { LocalStorageProvider } from '../../providers/local-storage/local-storage'

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild(Nav) nav: Nav;
  selectedItem: any;
  icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;
  items: Array<{lon: string,lat:string, cidade: string,favorito:boolean, icon: string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ls: LocalStorageProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    let fav = this.ls.getItem('favoritos'); 
    let d:[any];
    d=fav;
    d.forEach(element => {
      this.items.push({
          lat: element.lat,
          lon: element.lon,
          cidade: element.cidade,
          favorito:  element.favorito,
          icon: 'build'
        });
    });
     
    // this.ls.getItemAsPromise('favoritos').then(function(data){
    //   let d : any;
    //   d = data;

    //   d.forEach(element => {
    //     this.items.push({
    //           lat: element.lat,
    //           lon: element.lon,
    //           cidade: element.cidade,
    //           favorito:  element.favorito,
    //           icon: 'build'
    //         });        
    //   });

    //   this.items = data;      

    // }).catch(function(err){
    //   console.log(err);
    // });

    // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    // this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    //this.nav.setRoot(HomePage);
    this.navCtrl.setRoot(HomePage, {
      item: item
    });
  }
}
