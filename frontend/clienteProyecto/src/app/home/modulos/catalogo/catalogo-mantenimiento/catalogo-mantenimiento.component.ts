import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GeneralService } from '../../../../services/general/general.service';
import { URL_BASE_API } from '../../../../Utilidades/constantes';
import {
  MatDialogContent,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { empty, forkJoin, Observable, Subject } from 'rxjs';
import {
  DTOColor,
  DTOCorreo,
  DTOMarca,
  DTOModelo,
  DTOProducto,
  DTOTalla,
} from '../../../../DTOs/general';
import { MatSelectModule } from '@angular/material/select';
import { CatalogoComponent } from '../catalogo.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatLabel,
  MatFormField,
  MatInput,
  MatDialogContent,
];

@Component({
  selector: 'app-catalogo-mantenimiento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MATERIAL_MODULES],
  templateUrl: './catalogo-mantenimiento.component.html',
  styleUrl: './catalogo-mantenimiento.component.css',
})
export class CatalogoMantenimientoComponent implements OnInit, OnDestroy {
  productoForm: FormGroup = new FormGroup({});

  base64In: string = '';

  base64Output: string = '';
  listaTallas: DTOTalla[] = [];
  listaModelos: DTOModelo[] = [];
  listaMarcas: DTOMarca[] = [];
  listaColores: DTOColor[] = [];
  selectedValue = null;

  producto: DTOProducto = {
    nombreProducto: '',
    idColor: 0,
    idMarca: 0,
    idModelo: 0,
    idTalla: 0,
    imagenBase64: '',
    precioVenta: 0,
    fechaCreacion: undefined,
    fechaModificacion: undefined,
  };

  correo: DTOCorreo = {
    destinatario: '',
    asunto: '',
    mensaje: '',
    enviando: false,
    mensajeEstado: '',
  };

  item: [] = [];
  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
    @Inject(MAT_DIALOG_DATA) public data: CatalogoComponent
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerDatosServidor();
    this.asignarValoresFormulario(this.data);
  }

  obtenerDatosServidor() {
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
      }
    );
  }
  crearFormulario(): void {
    this.productoForm = new FormGroup({
      id: new FormControl(''),
      nombreProducto: new FormControl(''),
      idMarca: new FormControl(''),
      idModelo: new FormControl(''),
      idColor: new FormControl(''),
      idTalla: new FormControl(''),
      imagenBase64: new FormControl(''),
      precioVenta: new FormControl(''),
    });
  }

  asignarValoresFormulario(data: any): void {
    if (data != null && data != undefined && data.id != 0) {
      this.productoForm.get('id')?.setValue(data.id);
      this.productoForm.get('nombreProducto')?.setValue(data.nombreProducto);
      this.productoForm.get('precioVenta')?.setValue(data.precioVenta);
      this.productoForm.get('imagenBase64')?.setValue(data.im);
      this.producto = data as DTOProducto;
    } else {
      this.productoForm.reset();
    }
  }

  obtenerValoresFormulario(): any {
    let producto = this.producto as DTOProducto;
    producto.nombreProducto = this.productoForm.get('nombreProducto')?.value;
    producto.idColor =
      this.productoForm.get('idColor')?.value == ''
        ? producto.idColor
        : this.productoForm.get('idColor')?.value;
    producto.idMarca =
      this.productoForm.get('idMarca')?.value == ''
        ? producto.idMarca
        : this.productoForm.get('idMarca')?.value;
    producto.idModelo =
      this.productoForm.get('idModelo')?.value == ''
        ? producto.idModelo
        : this.productoForm.get('idModelo')?.value;
    producto.idTalla =
      this.productoForm.get('idTalla')?.value == ''
        ? producto.idTalla
        : this.productoForm.get('idTalla')?.value;
    producto.imagenBase64 =
      this.base64Output == '' || this.base64Output == undefined
        ? this.producto.imagenBase64
        : this.base64Output;
    producto.precioVenta =
      this.productoForm.get('precioVenta')?.value == ''
        ? producto.precioVenta
        : this.productoForm.get('precioVenta')?.value;

    return producto;
  }

  guardar(): void {
    let prod = this.obtenerValoresFormulario();
    console.log(prod);
    //Insertar
    if (prod.id == null || prod.id == undefined || prod.id === 0) {
      this.http
        .post(URL_BASE_API+'producto/', prod)
        .subscribe((res) => {
          console.log(res);
        });
    }
    //Actualizar
    else {
      this.http
        .patch(URL_BASE_API+'producto/' + prod.id + '/', prod)
        .subscribe((res) => {
          if (this.producto.precioVenta != prod.precioVenta) {
            let correo = this.correo as DTOCorreo;
            correo.destinatario = 'anthony.salas@tecsup.edu.pe';
            correo.asunto = 'ALERTA DE ACTUALIZACION DE PRODUCTO';
            correo.mensaje =
              '<b>Estimado usuario se ha efecutado el siguiente cambio para el producto :' +
              prod.nombreProducto +
              'con n° ' +
              prod.id +
              ': \n de precio de Venta: ' +
              this.producto.precioVenta +
              ' a ' +
              prod.precioVenta +
              '</b>';

            this.generalService.enviarCorreoSimple(correo).subscribe({
              next: (response: any) => {
                this.mostrarMensaje('Correo enviado', 'success');
              },
              complete: () => {
                correo.enviando = false;
              },
            });
          }
        });
    }
  }

  compareThem(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.convertFileToBase64(file);
    }
  }

  private convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Output = reader.result as string;
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.base64Output = '';
    };
    reader.readAsDataURL(file);
  }

  descargarPDF(): void {
    const pdf = new jsPDF();

    let producto = this.obtenerValoresFormulario();
    producto.Marca = this.listaMarcas.find((x) => x.id == producto.idMarca);
    producto.Modelo = this.listaModelos.find((x) => x.id == producto.idModelo);
    producto.Color = this.listaColores.find((x) => x.id == producto.idColor);
    producto.Talla = this.listaTallas.find((x) => x.id == producto.idTalla);

    console.log(producto);
    pdf.setFontSize(23);
    pdf.setTextColor(0, 0, 128);
    pdf.text('FICHA PRODUCTO: ', 10, 20);
    pdf.text('-----------------------------------------', 10, 30);
    producto.imagenBase64 != '' && producto.imagenBase64 != undefined
      ? pdf.addImage(producto.imagenBase64, 'PNG', 30, 30, 40, 40)
      : '';
    pdf.text('Nombre Producto: ' + producto.nombreProducto, 10, 90);
    pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 100);
    pdf.text('Modelo: ' + producto.Modelo.nombreModelo, 10, 110);
    pdf.text('Marca: ' + producto.Marca.nombreMarca, 10, 120);
    pdf.text('Color: ' + producto.Color.nombreColor, 10, 130);

    pdf.text('Talla: ' + producto.Talla.numeroCalzado, 10, 140);
    pdf.text('Precio Venta: ' + producto.precioVenta, 10, 150);

    pdf.save(producto.nombreProducto + '.pdf');
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    this.correo.mensajeEstado = mensaje;
    setTimeout(() => (this.correo.mensajeEstado = ''), 5000);
  }
  eliminar(){
    let prod = this.obtenerValoresFormulario();
    this.http
        .delete(URL_BASE_API+'producto/' + prod.id + '/')
        .subscribe((res) => {
          console.log(res);
        });
  }
  ngOnDestroy(): void {}
}
