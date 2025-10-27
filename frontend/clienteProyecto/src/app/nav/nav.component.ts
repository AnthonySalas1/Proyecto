import { Component, OnInit } from '@angular/core';
import { EventResource } from '../ServiceResource/EventResource';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API } from '../Utilidades/constantes';



@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  authenticaded = false;

  constructor( private http: HttpClient){
     
  }

  ngOnInit(): void {
    try{
    EventResource.auhtEmitter.subscribe(
      (auth: boolean) =>{
        this.authenticaded = auth;
      }
    )
    }
    catch(ex){
      console.log(ex);
    }
  }
  logout():void{
    this.http.post(URL_BASE_API+'logout/', {}, {withCredentials : true})
    .subscribe(
      () => this.authenticaded = false
    )
  }

}
