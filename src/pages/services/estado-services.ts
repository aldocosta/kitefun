import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,RequestMethod,ConnectionBackend } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadoServices {

	constructor(private http:Http){
	}

	public getEstadoCidade(){
		return this.http.get('./assets/estados-cidades.json').map(res => res.json());
	}
 
}