import { Component ,ViewChild, ElementRef} from '@angular/core';
import { DTOCargaResponse } from '../../../DTOs/general';
import { CargaMasivaService } from '../../../services/carga-service.service';

@Component({
  selector: 'app-carga-masiva',
  standalone: false,
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.css'
})
export class CargaMasivaComponent {
 @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  archivoSeleccionado: File | null = null;
  estaSubiendo = false;
  progreso = 0;
  resultado: DTOCargaResponse | null = null;
  errores: any[] = [];
  dragOver = false;

  constructor(private cargaMasivaService: CargaMasivaService) {
    this.cargaMasivaService.progreso$.subscribe(progreso => {
      this.progreso = progreso;
    });
  }

  onFileSelected(event: any): void {
    const archivo: File = event.target.files[0];
    this.validarYSeleccionarArchivo(archivo);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    
    const archivos = event.dataTransfer?.files;
    if (archivos && archivos.length > 0) {
      this.validarYSeleccionarArchivo(archivos[0]);
    }
  }

  abrirSelectorArchivos(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  validarYSeleccionarArchivo(archivo: File): void {

    if (!archivo.name.toLowerCase().endsWith('.csv')) {
      alert('Por favor selecciona un archivo CSV');
      return;
    }

    if (archivo.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 10MB');
      return;
    }

    this.archivoSeleccionado = archivo;
    this.resultado = null;
    this.errores = [];
  }

  subirArchivo(): void {
    try{
    if (!this.archivoSeleccionado) {
      alert('Por favor selecciona un archivo');
      return;
    }

    this.estaSubiendo = true;
    this.resultado = null;
    this.errores = [];

    this.cargaMasivaService.subirArchivoCSV2(this.archivoSeleccionado).subscribe({
      
      next: (response: DTOCargaResponse) => {
        this.estaSubiendo = false;
        this.resultado = response;
        this.errores = response.errores;
        
        if (response.registrosErroneos > 0) {
          console.warn('Algunos registros tuvieron errores:', response.errores);
        }
      },
      error: (error) => {
        this.estaSubiendo = false;
        console.error('Error en la carga:', error);
        alert(`Error al subir archivo: ${error.error?.error || error.message}`);
      }
    });
  }
  catch(ex){
    console.log(ex)
  }
}

  limpiar(): void {
    this.archivoSeleccionado = null;
    this.resultado = null;
    this.errores = [];
    this.progreso = 0;
    
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
    
    this.cargaMasivaService.resetProgreso();
  }

  descargarTemplate(): void {
    const template = `nombreProducto;	idMarca;	idModelo;	idColor;	idTalla;	imagenBase64;	precioVenta
productoPorCargaMasiva;1;1;1;1;;200.00`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plantillaCargaMasiva.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}