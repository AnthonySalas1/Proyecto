import { Component, OnInit, Output } from '@angular/core';
import { DTOColor, DTORol } from '../../../DTOs/general';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrador',
  standalone: false,
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css',
})
export class AdministradorComponent implements OnInit {
  @Output() datos: any[] = [];

  mostrarContenidoRol = false;
  mostrarContenidoEntidad = false;
  opcion = '';
  listaRoles: DTORol[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  obtenerDatosServidor(opcion: string) {
    try {
     
      // this.http
      //   .get('http://localhost:8000/api/' + opcion + '/')
      //   .subscribe((res) => {

      //     this.contruirDTO(res, opcion);

      //   });
    } catch (ex) {
      console.log(ex);
    }
  }

  seleccionarOpcion(opcion: any) {
    this.datos =[];
     console.log('opcion padre ',opcion);
    if (this.habilitarContenido(opcion)) {
      this.datos.push(opcion);
    }
  }

  habilitarContenido(opcion: any): boolean {
    switch (opcion) {
      case 'rol':
        this.limpiar();
        this.mostrarContenidoRol = true;
        return true;
        break;
      case 'entidad':
        this.limpiar();
        this.mostrarContenidoEntidad = true;
        return true;
        break;
      default:
        return false;
    }
  }
  limpiar() {
    this.mostrarContenidoRol = false;
    this.mostrarContenidoEntidad = false;
  }
}
