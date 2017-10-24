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
    console.log('Hello WeatherapiProvider Provider');
  }

  public getapilat_lon(lat,lon){
    
  	let headers = new Headers({ 'Content-Type': 'application/json' });
  	let options = new RequestOptions(
    {
       headers: headers
    });

    //return this.http.get('http://aldocosta-com-br.umbler.net/api/latlon/-23.9609/-46.3337',options).map(res => res.json());
//    return this.http.get('http://aldocosta-com-br.umbler.net/api/latlon/'+lat+'/'+lon+'',options).map(res => res.json());
return this.http.get('http://aldocosta-com-br.umbler.net/api/latlon/'+lat+'/'+lon+'',options).map(res => res.json());
  	
  }

}
