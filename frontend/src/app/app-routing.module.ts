import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },

    { path: 'agregarGruero', component: LoginComponent },
    { path: 'modificarGruero', component: HomeComponent },
    { path: 'verGrueros', component: LoginComponent },

    { path: 'agregarPedidoGrua', component: HomeComponent },
    { path: 'modificarPedidoGrua', component: LoginComponent },
    { path: 'verPedidosDeGrua', component: HomeComponent },

    { path: 'agregarVehiculo', component: HomeComponent },
    { path: 'modificarVehiculo', component: LoginComponent },
    { path: 'verVehiculos', component: HomeComponent },

    { path: 'agregarPoliza', component: HomeComponent },
    { path: 'modificarPoliza', component: LoginComponent },
    { path: 'verPolizas', component: HomeComponent },

    { path: 'agregarCuota', component: HomeComponent },
    { path: 'modificarCuota', component: LoginComponent },
    { path: 'verCuotas', component: HomeComponent },

    { path: 'verReportesDeGruas', component: HomeComponent },
    { path: 'verReportesDeVehiculos', component: LoginComponent },
    { path: 'verReportesDePolizas', component: HomeComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
