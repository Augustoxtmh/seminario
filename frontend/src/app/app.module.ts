import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AgregarPGruaComponent } from './pedidoGrua/agregar-pgrua/agregar-pgrua.component';
import { ModificarPGruaComponent } from './pedidoGrua/modificar-pgrua/modificar-pgrua.component';
import { VerPGruaComponent } from './pedidoGrua/ver-pgrua/ver-pgrua.component';
import { VerPGruasComponent } from './pedidoGrua/ver-pgruas/ver-pgruas.component';
import { AgregarVehiculoComponent } from './vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { ModificarVehiculoComponent } from './vehiculo/modificar-vehiculo/modificar-vehiculo.component';
import { VerVehiculoComponent } from './vehiculo/ver-vehiculo/ver-vehiculo.component';
import { VerVehiculosComponent } from './vehiculo/ver-vehiculos/ver-vehiculos.component';
import { AgregarPolizaComponent } from './poliza/agregar-poliza/agregar-poliza.component';
import { ModificarPolizaComponent } from './poliza/modificar-poliza/modificar-poliza.component';
import { VerPolizasComponent } from './poliza/ver-polizas/ver-polizas.component';
import { ReportesDeGruasComponent } from './reportesDeGrua/reportes-de-gruas/reportes-de-gruas.component';
import { ReportesDeVehiculosComponent } from './reportesDeGrua/reportes-de-vehiculos/reportes-de-vehiculos.component';
import { ReportesDePolizasComponent } from './reportesDeGrua/reportes-de-polizas/reportes-de-polizas.component';
import { GrueroComponent } from './gruero/gruero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { VerCuotasComponent } from './poliza/ver-cuotas/ver-cuotas.component';
import { GeneradorCuotaComponent } from './poliza/generador-cuota/generador-cuota.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AgregarPGruaComponent,
    ModificarPGruaComponent,
    VerPGruaComponent,
    VerPGruasComponent,
    AgregarVehiculoComponent,
    ModificarVehiculoComponent,
    VerVehiculoComponent,
    VerVehiculosComponent,
    AgregarPolizaComponent,
    ModificarPolizaComponent,
    VerPolizasComponent,
    ReportesDeGruasComponent,
    ReportesDeVehiculosComponent,
    ReportesDePolizasComponent,
    GrueroComponent,
    VerCuotasComponent,
    GeneradorCuotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
