import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota';
import { Poliza } from 'src/app/models/poliza';
import { CuotaService } from 'src/app/service/cuota/cuota.service';

@Component({
  selector: 'app-ver-poliza',
  templateUrl: './ver-poliza.component.html',
  styleUrls: ['./ver-poliza.component.css']
})
export class VerPolizaComponent {
  polizaRecibida?: Poliza;
  formularioCuota: FormGroup;
  polizas: Poliza[] = [];
  date: Date = new Date();

  constructor(private fb: FormBuilder, private cuotaServ: CuotaService
    , private router: Router
  )
  {
    const navigation = this.router.getCurrentNavigation();
    this.polizaRecibida = navigation?.extras.state?.['poliza'];

    console.log(this.polizaRecibida)

    this.formularioCuota = this.fb.group({
      poliza: [
        this.polizaRecibida?.NumeroPoliza,
        [Validators.required],
      ],
      nCuota: [
        '',
        [Validators.required],
      ],
      Cantidad: [
        '',
        [Validators.required],
      ],
      FechaV: [
        '',
        [Validators.required],
      ],
      Monto: [
        '',
        [Validators.required],
      ]}
    )
  }

  onSubmit() {
    console.log('creando');
  
    const nCuota = this.formularioCuota.controls['nCuota'].value;
    const Cantidad = this.formularioCuota.controls['Cantidad'].value;
    const FechaV = this.formularioCuota.controls['FechaV'].value;
    const Monto = this.formularioCuota.controls['Monto'].value;
    const poliza = this.formularioCuota.controls['poliza'].value;

    for (let index = 0; index < Cantidad; index++) {
      this.cuotaServ.createCuota(new Cuota(nCuota, FechaV, Monto, poliza)).subscribe((res) => {
        console.log(res)
      });
    }
  } 
}
