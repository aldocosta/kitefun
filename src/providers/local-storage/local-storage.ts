import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {
  
  constructor(public http: Http) {
    console.log('Hello LocalStorageProvider Provider');
  }

  saveItem(key,data){
    localStorage.setItem(key,JSON.stringify(data));
  }

  saveItemAsPromise(key,data){
    let p = new Promise(function(resolve,reject){
      try{
        localStorage.setItem(key,JSON.stringify(data));
        resolve(true);
      }catch(e){
        reject(e);
      }
    });    
  }

  getItem(key){
    let ret = localStorage.getItem(key);
    if(ret){
      return JSON.parse(ret);
    }
    return ret;
  }

  getItemAsPromise(key){
    let p = new Promise(function(resolve,reject){
      try {
        let ret = localStorage.getItem(key);
        if(ret){
          resolve(JSON.parse(ret));
        }
      } catch (error) {
        reject(error);
      }
    });    
    return p;
  }
}
