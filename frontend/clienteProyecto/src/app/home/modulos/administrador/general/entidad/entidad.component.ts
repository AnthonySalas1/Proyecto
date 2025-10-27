import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DTOEntidad } from '../../../../../DTOs/general';
import { URL_BASE_API } from '../../../../../Utilidades/constantes';

@Component({
  selector: 'app-entidad',
  standalone: false,
  templateUrl: './entidad.component.html',
  styleUrl: './entidad.component.css',
})
export class EntidadComponent implements OnInit {
  @Input() datos: any[] = [];

  opcion: string = '';
  listaEntidades: DTOEntidad[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    try {
      this.opcion = this.datos[0] as string;
      console.log('componeneteEntidad ', this.opcion);
      this.http
        .get(URL_BASE_API + this.opcion + '/')
        .subscribe((res) => {
          console.log(res);
          this.listaEntidades = res as DTOEntidad[];
          console.log(this.listaEntidades);
        });
    } catch (ex) {
      console.log(ex);
    }
  }
    actualizarItem( item: DTOEntidad, event: Event) {
      const target = event.target as HTMLElement;
      
      item.nombreEntidad = target.textContent?.trim() || '';
      item.documentoIdentidad = target.textContent?.trim() || '';
      this.guardar(item);
    }
  
  
    guardar(item: DTOEntidad): void {
      try {
        console.log(item)
        this.http
          .put(URL_BASE_API+'entidad/'+item.id+'/', item)
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
          .delete(URL_BASE_API+'api/entidad/'+item.id+'/')
          .subscribe((res) => {
            
            this.listaEntidades.splice(this.listaEntidades.findIndex(entidad => entidad.id === item.id),1);
          });
      } catch (ex) {
        console.log(ex);
      }
      
    }
    agregar(){
      try{
      let entidad:DTOEntidad = ({ nombreEntidad:''});
      
      this.http
        .post(URL_BASE_API+'api/entidad/', entidad)
          .subscribe((res) => {
            this.listaEntidades.push(res as DTOEntidad);
          })
        }
           catch (ex) {
        console.log(ex);
      }
    }
}
