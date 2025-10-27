import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_BASE_API } from '../Utilidades/constantes';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
      idEntidad: 0,
      idRol: 0,
      idPermiso: 0

    });
  }

  guardar(): void {
    console.log(this.form.value);

    this.form.value.idEntidad = 1;
    this.form.value.idRol = 1;
    this.form.value.idPermiso = 1;

    this.http.post(URL_BASE_API +'/registro/', this.form.value).subscribe(res => {
      this.router.navigate(['/login']);
    });
    

  }
}
