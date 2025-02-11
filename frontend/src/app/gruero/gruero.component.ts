import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GrueroService } from '../service/gruero/gruero.service';
import { gruero } from '../models/gruero'

@Component({
  selector: 'app-gruero',
  templateUrl: './gruero.component.html',
  styleUrls: ['./gruero.component.css']
})
export class GrueroComponent {
  formularioVehiculo: FormGroup;
  grueros: gruero[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private grueroServ: GrueroService)
  {
    this.formularioVehiculo = this.fb.group({
      nombre: [
        '',
        [Validators.required],
      ],
      telefono: [
        '',
        [Validators.required],
      ],}
    )
    this.grueroServ.getAllGrueros().subscribe(grueros => {
      this.dtTrigger.next(grueros);
    });

  }

  onRowClick(gruero: gruero) {
    /* this.vehiculoServ.getVehiculoEspecifico(vehiculo.id.valueOf()).subscribe(
      vehiculoRecibido => {
        if (vehiculo.empresa == 1){
          this.datosVehiculoAgrosaltaService.setVehiculo(vehiculoRecibido);
          this.vehiculo = vehiculoRecibido;
          this.router.navigate(['/cliente/agrosalta']);
        } else {
          this.datosVehiculoLiderarService.setVehiculo(vehiculoRecibido);
          this.vehiculo = vehiculoRecibido;
          this.router.navigate(['/cliente/liderar']);
        };
      }
    ) */
  } 
}
