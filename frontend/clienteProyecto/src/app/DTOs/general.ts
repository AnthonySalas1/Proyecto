export interface DTOModulo {
  id: number;
  nombreModulo: string;
  imagenBase64: string;
  idPermiso: number;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface DTORol {
  id?: number;
  rol: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}

export interface DTOProducto {
  id?: number;
  nombreProducto: string;
  idMarca: number;
  idModelo: number;
  idColor: number;
  idTalla: number;
  imagenBase64?: string;
  precioVenta: number;
  fechaCreacion?: Date;
  fechaModificacion?: Date;

  //Atributos de busqueda
  Color?: DTOColor;
  Marca?: DTOMarca;
  Modelo?: DTOModelo;
  Talla?: DTOTalla;
}

export interface DTOEntidad {
  id?: number;
  nombreEntidad?: string;
  documentoIdentidad?: string;
  direccion?: string;
  correo?: string;
  telefono?: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}

export interface DTOTalla {
  id: number;
  numeroCalzado: number;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface DTOModelo {
  id: number;
  nombreModelo: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface DTOMarca {
  id: number;
  nombreMarca: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface DTOColor {
  id: number;
  nombreColor: string;
  codigoHex: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface DTOCargaResponse {
  mensaje: string;
  registrosProcesados: number;
  registrosErroneos: number;
  errores: any[];
  carga_id: number;
}

export interface DTOEstadoCarga {
  id: number;
  archivo: string;
  fechaCreacion: string;
  registrosProcesados: number;
  registrosErroneos: number;
  estado: string;
}

export interface DTOCorreo {
  destinatario: string;
  asunto: string;
  mensaje: string;
  enviando: boolean;
  mensajeEstado: string;
}
