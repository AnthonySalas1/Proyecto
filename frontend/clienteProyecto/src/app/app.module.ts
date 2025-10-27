import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AdministradorComponent } from './home/modulos/administrador/administrador.component';
import { CatalogoComponent } from './home/modulos/catalogo/catalogo.component';
import { CatalogoMantenimientoComponent } from './home/modulos/catalogo/catalogo-mantenimiento/catalogo-mantenimiento.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CargaMasivaComponent } from './home/carga/carga-masiva/carga-masiva.component';
import { RolComponent } from './home/modulos/administrador/general/rol/rol.component';
import { EntidadComponent } from './home/modulos/administrador/general/entidad/entidad.component';
import { UsuarioComponent } from './home/modulos/administrador/general/usuario/usuario.component';
import { PerfilComponent } from './home/modulos/administrador/general/perfil/perfil.component';
import { MarcaComponent } from './home/modulos/administrador/general/objetoNegocio/marca/marca.component';
import { TallaComponent } from './home/modulos/administrador/general/objetoNegocio/talla/talla.component';
import { ModeloComponent } from './home/modulos/administrador/general/objetoNegocio/modelo/modelo.component';
import { ColorComponent } from './home/modulos/administrador/general/objetoNegocio/color/color.component'




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    RegistroComponent,
    AdministradorComponent,
    CatalogoComponent,
    CargaMasivaComponent,
    RolComponent,
    EntidadComponent,
    UsuarioComponent,
    PerfilComponent,
    MarcaComponent,
    TallaComponent,
    ModeloComponent,
    ColorComponent,

   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
