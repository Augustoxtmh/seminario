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
import { ReportesDePolizasComponent } from './reportesDeGrua/reportes-de-polizas/reportes-de-polizas.component';
import { GrueroComponent } from './gruero/gruero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GeneradorCuotaComponent } from './cuota/generador-cuota/generador-cuota.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { UsuarioComponent } from './usuario/usuario.component';
import { ModificarCuotaComponent } from './cuota/modificar-cuota/modificar-cuota.component';
import { VerCuotasComponent } from './cuota/ver-cuotas/ver-cuotas.component';

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
    ReportesDePolizasComponent,
    GrueroComponent,
    GeneradorCuotaComponent,
    UsuarioComponent,
    ModificarCuotaComponent,
    VerCuotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
