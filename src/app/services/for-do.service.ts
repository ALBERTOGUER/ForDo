import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PrincipalComponent } from '../components/principal/principal.component';
import { Observable } from 'rxjs';
import { contentThing } from '../interfaces/thing.interface';

@Injectable({
  providedIn: 'root'
})
export class ForDoService {

  private urlGlobal = 'http://10.2.47.9:5000'

  constructor(private http: HttpClient) { }

  public PostThing(thing) {

    let url = ` ${this.urlGlobal}/v1/things`;

    return this.http.post(url, thing);


  }

  public GetThing(): Observable<Object> {

    let url = ` ${this.urlGlobal}/v1/things`;
    return this.http.get(url)
  }

  public putThing(thing:contentThing){

    let url= `${this.urlGlobal}/v1/things/${thing._id}`
    console.log(url);
    

    return this.http.put(url,thing)

  }

  public deleteThing(thingid){
    let url= `${this.urlGlobal}/v1/things/${thingid}`

    return this.http.delete(url);
  }


}
