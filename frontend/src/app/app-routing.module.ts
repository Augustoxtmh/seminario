import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AgregarPGruaComponent } from './pedidoGrua/agregar-pgrua/agregar-pgrua.component';
import { ModificarPGruaComponent } from './pedidoGrua/modificar-pgrua/modificar-pgrua.component';
import { VerPGruasComponent } from './pedidoGrua/ver-pgruas/ver-pgruas.component';
import { AgregarVehiculoComponent } from './vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { ModificarVehiculoComponent } from './vehiculo/modificar-vehiculo/modificar-vehiculo.component';
import { VerVehiculosComponent } from './vehiculo/ver-vehiculos/ver-vehiculos.component';
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
import { authLoggedGuard } from './guards/auth-logged.guard';
import { authGuard } from './guards/auth.guard';



const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authLoggedGuard] },

    { path: 'grueros', component: GrueroComponent, canActivate: [authLoggedGuard] },

    { path: 'agregarPedidoGrua', component: AgregarPGruaComponent, canActivate: [authLoggedGuard] },
    { path: 'modificarPedidoGrua', component: ModificarPGruaComponent, canActivate: [authLoggedGuard] },
    { path: 'verPedidosDeGrua', component: VerPGruasComponent, canActivate: [authLoggedGuard] },

    { path: 'agregarVehiculo', component: AgregarVehiculoComponent, canActivate: [authLoggedGuard] },
    { path: 'modificarVehiculo', component: ModificarVehiculoComponent, canActivate: [authLoggedGuard] },
    { path: 'verVehiculos', component: VerVehiculosComponent, canActivate: [authLoggedGuard] },

    { path: 'agregarPoliza', component: AgregarPolizaComponent, canActivate: [authLoggedGuard] },
    { path: 'modificarPoliza', component: ModificarPolizaComponent, canActivate: [authLoggedGuard] },
    { path: 'verPolizas', component: VerPolizasComponent, canActivate: [authLoggedGuard] },

    { path: 'generarCuota', component: GeneradorCuotaComponent, canActivate: [authLoggedGuard] },
    { path: 'modificarCuota', component: ModificarCuotaComponent, canActivate: [authLoggedGuard] },
    { path: 'verCuotas', component: VerCuotasComponent, canActivate: [authLoggedGuard] },

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
