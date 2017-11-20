import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  config: {
      cidades:Array<{nome:string,favorito:boolean,urlapi:string}>
  }

  constructor(public http: Http) {

  }

  public gravarConfig(lsname:string,lsvalue){
  	window.localStorage.setItem(lsname,lsvalue);
  }

  public retornarConfig(lsname){
  	let  p = new Promise((res, rej)=>{
		let ret = window.localStorage.getItem(lsname);
		if(ret!=null && ret!=undefined && ret != 'null'  && ret != 'undefined'){
			this.config = JSON.parse(ret) as { cidades:Array<{nome:string,favorito:boolean,urlapi:string}> };          
			res(this.config);
		}else{
			rej(null);
		}
  	});
  	
  	return p;
  }  

}
