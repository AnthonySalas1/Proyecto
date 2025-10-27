import { Component, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DTOModulo } from '../DTOs/general';
import { EventResource } from '../ServiceResource/EventResource';
import { URL_BASE_API } from '../Utilidades/constantes';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  listaModulos: DTOModulo[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    
    this.http.get(URL_BASE_API+'/usuario/', {
      withCredentials: true,
    }).subscribe(
      (res: any) => {

        EventResource.auhtEmitter.emit(true);
       
      },(err: any) => {
        console.log(err)
         EventResource.auhtEmitter.emit(false);
      }
    );
    this.http.get(URL_BASE_API+'modulo/', {
    }).subscribe(
      (res: any) => {
        this.listaModulos = res as DTOModulo[]
        EventResource.auhtEmitter.emit(true);
      }
    );

   
  }

}
