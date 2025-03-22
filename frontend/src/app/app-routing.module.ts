import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AgregarPGruaComponent } from './pedidoGrua/agregar-pgrua/agregar-pgrua.component';
import { ModificarPGruaComponent } from './pedidoGrua/modificar-pgrua/modificar-pgrua.component';
import { VerPGruasComponent } from './pedidoGrua/ver-pgruas/ver-pgruas.component';
import { VerPGruaComponent } from './pedidoGrua/ver-pgrua/ver-pgrua.component';
import { AgregarVehiculoComponent } from './vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { ModificarVehiculoComponent } from './vehiculo/modificar-vehiculo/modificar-vehiculo.component';
import { VerVehiculosComponent } from './vehiculo/ver-vehiculos/ver-vehiculos.component';
import { VerVehiculoComponent } from './vehiculo/ver-vehiculo/ver-vehiculo.component';
import { AgregarPolizaComponent } from './poliza/agregar-poliza/agregar-poliza.component';
import { ModificarPolizaComponent } from './poliza/modificar-poliza/modificar-poliza.component';
import { VerPolizasComponent } from './poliza/ver-polizas/ver-polizas.component';
import { ReportesDeGruasComponent } from './reportesDeGrua/reportes-de-gruas/reportes-de-gruas.component';
import { ReportesDePolizasComponent } from './reportesDeGrua/reportes-de-polizas/reportes-de-polizas.component';
import { GrueroComponent } from './gruero/gruero.component';

import { GeneradorCuotaComponent } from './cuota/generador-cuota/generador-cuota.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { VerCuotasComponent } from './cuota/ver-cuotas/ver-cuotas.component';
import { ModificarCuotaComponent } from './cuota/modificar-cuota/modificar-cuota.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },

    { path: 'grueros', component: GrueroComponent },

    { path: 'agregarPedidoGrua', component: AgregarPGruaComponent },
    { path: 'modificarPedidoGrua', component: ModificarPGruaComponent },
    { path: 'verPedidosDeGrua', component: VerPGruasComponent },
    { path: 'verPedidoDeGrua', component: VerPGruaComponent },

    { path: 'agregarVehiculo', component: AgregarVehiculoComponent },
    { path: 'modificarVehiculo', component: ModificarVehiculoComponent },
    { path: 'verVehiculos', component: VerVehiculosComponent },
    { path: 'verVehiculo', component: VerVehiculoComponent },

    { path: 'agregarPoliza', component: AgregarPolizaComponent },
    { path: 'modificarPoliza', component: ModificarPolizaComponent },
    { path: 'verPolizas', component: VerPolizasComponent },

    { path: 'generarCuota', component: GeneradorCuotaComponent },
    { path: 'modificarCuota', component: ModificarCuotaComponent },
    { path: 'verCuotas', component: VerCuotasComponent },

    { path: 'gestionUsuarios', component: UsuarioComponent, canActivate: [authGuard] },

    { path: 'verReportesDeGruas', component: ReportesDeGruasComponent, canActivate: [authGuard] },
    { path: 'verReportesDePolizas', component: ReportesDePolizasComponent, canActivate: [authGuard] },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
