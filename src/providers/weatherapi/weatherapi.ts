import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherapiProvider {

  constructor(public http: Http) {    
  }

  public getapilat_lon(lat,lon){
    
  	let headers = new Headers({ 'Content-Type': 'application/json' });
  	let options = new RequestOptions(
    {
       headers: headers
    });

    let path = 'http://192.168.0.103:3000/api/kite/latlon/'+lat+'/'+lon;
    let path2 = 'http://aldocosta.com.br/api/kite/latlon/'+lat+'/'+lon;

    return this.http.get(path2,options).map(res => res.json());  	
  }

  public getapiflickr_lat_lon(lat,lon){
    //lat ='-23.8679702'; lon = '-46.4790072';
    let headers = new Headers({ 'Content-Type': 'application/json' });
  	let options = new RequestOptions(
    {
       headers: headers
    });
    let pathimg ="http://aldocosta.com.br/api/flickr/kiteapi/latlon/"+lat+"/"+lon;
    return this.http.get(pathimg,options).map(res => res.json());  	
  }

  public getapiCities(cityname){
    let headers = new Headers({ 'Content-Type': 'application/json' });
  	let options = new RequestOptions(
    {
       headers: headers
    });  
    
    let path = 'http://aldocosta.com.br/api/kite/cidade/'+cityname;
    let path2 = 'http://localhost:3000/api/kite/cidade/'+cityname;
    
    return this.http.get(path,options).map(res => res.json());  	

  }

}
