import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_BASE_API } from '../Utilidades/constantes';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  myform: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ingresar() {

    this.http.post(URL_BASE_API+'login/',  this.myform.value, {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/']));
  }

}
