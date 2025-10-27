import {
  Component,
  ViewContainerRef,
  inject,
  OnInit,
  Injectable,
} from '@angular/core';
import {
  DTOColor,
  DTOMarca,
  DTOModelo,
  DTOProducto,
  DTOTalla,
} from '../../../DTOs/general';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CatalogoMantenimientoComponent } from './catalogo-mantenimiento/catalogo-mantenimiento.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { CargaMasivaComponent } from '../../carga/carga-masiva/carga-masiva.component';
import { URL_BASE_API } from '../../../Utilidades/constantes';

@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent implements OnInit {
  private _dialog = inject(MatDialog);

  listaProductos: DTOProducto[] = [];

  listaTallas: DTOTalla[] = [];
  listaModelos: DTOModelo[] = [];
  listaMarcas: DTOMarca[] = [];
  listaColores: DTOColor[] = [];
  listaFiltradaProductos: DTOProducto[] = [];
  // elementos de buqueda

  caracteres$!: Observable<DTOProducto[]>;
  busquedaForm: FormGroup = new FormGroup({});
  terminoBusqueda: FormControl = new FormControl('');

  private valueChangeSubscription: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private viewContainerRef: ViewContainerRef
  ) {
    this.crearFormularioBusqueda();
    this.terminoBusqueda.valueChanges.pipe().subscribe((termino) => {
      this.listaFiltradaProductos = this.listaProductos.filter((producto) =>
        producto.nombreProducto
          .toLowerCase()
          .includes(termino?.toLowerCase() || '')
      );
    });
    this.busquedaForm.valueChanges.pipe().subscribe((item) => {
      console.log(item);
      this.listaFiltradaProductos = this.listaProductos.filter(
        (producto) =>
          producto.Marca?.id == item.marca || producto.Talla?.id == item.talla
      );
      console.log(this.listaFiltradaProductos);
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.http.get(URL_BASE_API+'talla/'),
      this.http.get(URL_BASE_API+'color/'),
      this.http.get(URL_BASE_API+'marca/'),
      this.http.get(URL_BASE_API+'modelo/'),
      this.http.get(URL_BASE_API+'producto/'),
    ]).subscribe(
      ([
        listaTallas,
        listaColores,
        listaMarcas,
        listaModelos,
        listaProductos,
      ]) => {
        this.listaTallas = listaTallas as DTOTalla[];
        this.listaColores = listaColores as DTOColor[];
        this.listaMarcas = listaMarcas as DTOMarca[];
        this.listaModelos = listaModelos as DTOModelo[];
        this.listaProductos = listaProductos as DTOProducto[];

        this.listaProductos.forEach((producto) => {
          producto.Color = this.listaColores.find(
            (color) => color.id === producto.idColor
          );
          producto.Marca = this.listaMarcas.find(
            (marca) => marca.id === producto.idMarca
          );
          producto.Modelo = this.listaModelos.find(
            (modelo) => modelo.id === producto.idModelo
          );
          producto.Talla = this.listaTallas.find(
            (talla) => talla.id === producto.idTalla
          );

          this.listaFiltradaProductos = this.listaProductos;
        });
      }
    );
  }

  crearFormularioBusqueda(): void {
    this.busquedaForm = new FormGroup({
      marca: new FormControl(''),
      modelo: new FormControl(''),
      color: new FormControl(''),
      talla: new FormControl(''),
    });
  }

  abrirComponenteModal(item?: any): void {
    const dialogRef = this._dialog.open(CatalogoMantenimientoComponent, {
      data: item,
      width: '600px',
    });
     dialogRef.afterClosed().subscribe(res =>{
      this.ngOnInit();
     })
  }

  abrirCargaMasivaComponenteModal(item?: any): void {
    const dialogRef = this._dialog.open(CargaMasivaComponent, {
      data: item,
      width: '800px',
    });
     dialogRef.afterClosed().subscribe(res =>{
      this.ngOnInit();
     })
  }
}
