import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DTOCargaResponse, DTOEstadoCarga } from '../DTOs/general';
import { URL_BASE_API } from '../Utilidades/constantes';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})

export class CargaMasivaService {


  private apiUrl = URL_BASE_API;  // Ajusta tu URL de Django

  private progresoSubject = new BehaviorSubject<number>(0);
  public progreso$ = this.progresoSubject.asObservable();

  constructor(private http: HttpClient) { }


  obtenerEstadoCarga(cargaId: number): Observable<DTOEstadoCarga> {
    return this.http.get<DTOEstadoCarga>(`${this.apiUrl}estadoCarga/${cargaId}/`);
  }

  subirArchivoCSV2(archivo: File): Observable<DTOCargaResponse> {
    // Crear FormData de manera simple
    const formData = new FormData();
    formData.append('archivo', archivo);
    // Hacer la petición SIN headers (Angular los pone automáticamente)
    return this.http.post<DTOCargaResponse>(`${this.apiUrl}cargaMasiva/`, formData);
  }
  resetProgreso(): void {
    this.progresoSubject.next(0);
  }
}
