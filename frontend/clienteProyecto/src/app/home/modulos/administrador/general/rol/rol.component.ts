import { Component, ElementRef, Input, IterableDiffers, OnInit, ViewChild, viewChild } from '@angular/core';
import { DTORol } from '../../../../../DTOs/general';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_API } from '../../../../../Utilidades/constantes';

@Component({
  selector: 'app-rol',
  standalone: false,
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css',
})
export class RolComponent implements OnInit {
  @Input() datos: any[] = [];
  @ViewChild('divRol') divRol!: ElementRef;

  opcion: string = '';
  listaRoles: DTORol[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    try {
      this.opcion = this.datos[0] as string;
      this.http
        .get(URL_BASE_API + this.opcion + '/')
        .subscribe((res) => {
          this.listaRoles = res as DTORol[];
        });
    } catch (ex) {
      console.log(ex);
    }
  }

  actualizarItem(indice: number, campo: string, item: DTORol, event: Event) {
    const target = event.target as HTMLElement;
    
    item.rol = target.textContent?.trim() || '';
    this.guardar(item);
  }


  guardar(item: DTORol): void {
    try {
      console.log(item)
      this.http
        .put(URL_BASE_API +'/rol/'+item.id+'/', item)
        .subscribe((res) => {
          console.log(res)
        });
    } catch (ex) {
      console.log(ex);
    }
    
  }
  eliminar(item: any): void {
    try {
      this.http
        .delete(URL_BASE_API+'rol/'+item.id+'/')
        .subscribe((res) => {
          
          this.listaRoles.splice(this.listaRoles.findIndex(rol => rol.id === item.id),1);
        });
    } catch (ex) {
      console.log(ex);
    }
    
  }
  agregar(){
    try{
    let rol:DTORol = ({ rol:''});
    
    this.http
      .post(URL_BASE_API, rol)
        .subscribe((res) => {
          this.listaRoles.push(res as DTORol);
        })
      }
         catch (ex) {
      console.log(ex);
    }
  }
}
