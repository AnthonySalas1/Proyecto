import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DTOCorreo } from '../../DTOs/general';
import { URL_BASE_API } from '../../Utilidades/constantes';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private apiUrl = URL_BASE_API + 'enviarCorreo/';
  constructor(private http: HttpClient) { }

    enviarCorreoSimple(correo: DTOCorreo) {
    const datos = {
      destinatario: correo.destinatario,
      asunto: correo.asunto,
      mensaje: correo.mensaje
    };

    return this.http.post(this.apiUrl, datos);
  }
}
