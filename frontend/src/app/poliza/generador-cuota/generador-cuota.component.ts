import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Cuota } from 'src/app/models/cuota';
import { Poliza } from 'src/app/models/poliza';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generador-cuota',
  templateUrl: './generador-cuota.component.html',
  styleUrls: ['./generador-cuota.component.css']
})
export class GeneradorCuotaComponent {
  polizaRecibida: Poliza;
  formularioCuota: FormGroup;
  polizas: Poliza[] = [];
  date: Date = new Date();

  constructor(private fb: FormBuilder, private cuotaServ: CuotaService
    , private router: Router
  )
  {
    const navigation = this.router.getCurrentNavigation();
    this.polizaRecibida = navigation?.extras.state?.['poliza'];

    const fechaV = this.polizaRecibida?.Vigencia ? new Date(this.polizaRecibida.Vigencia) : new Date();
    fechaV.setMonth(fechaV.getMonth() + 2);

    this.formularioCuota = this.fb.group({
      poliza: [
        this.polizaRecibida?.NumeroPoliza,
        [Validators.required],
      ],
      nCuota: [
        '0',
        [Validators.required],
      ],
      Cantidad: [
        '1',
        [Validators.required],
      ],
      FechaV: [
        fechaV.getDate()+'/'+fechaV.getMonth()+'/'+fechaV.getFullYear(),
        [Validators.required],
      ],
      Monto: [
        '',
        [Validators.required],
      ]}
    )
  }

  onSubmit() {  
    let nCuota = parseInt(this.formularioCuota.controls['nCuota'].value);
    const Cantidad = parseInt(this.formularioCuota.controls['Cantidad'].value);
    let FechaV = this.formularioCuota.controls['FechaV'].value;
    const Monto = this.formularioCuota.controls['Monto'].value;
    const poliza = this.formularioCuota.controls['poliza'].value;
    let idUsuario = Number(this.polizaRecibida.UsuarioId);

    if (nCuota < 0 || nCuota > 5 || Cantidad == 0 || FechaV == '' || Monto == '' || poliza == '') {
      console.log('error')
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Todos los campos son requeridos",
        showConfirmButton: false,
        timer: 1500,
        width: '25vw',
        padding: '20px',
      });
      return;
    }

    if (nCuota + Cantidad > 6) {
      console.log('error')
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "El número de cuota superará el maximo",
        showConfirmButton: false,
        timer: 1500,
        width: '25vw',
        padding: '20px',
      });
      return;
    }
    
    for (let index = 0; index < Cantidad; index++) {
      const formato = FechaV.indexOf('/') !== -1 ? '/' : '-';
      const partesFecha = FechaV.split(formato);
      let dia = parseInt(partesFecha[0]);
      let mes = parseInt(partesFecha[1]) - 1;
      let anio = parseInt(partesFecha[2]);
      let fecha = new Date(anio, mes, dia);
  
      this.cuotaServ.createCuota(new Cuota(nCuota, fecha, Monto, poliza, idUsuario)).pipe(
        catchError(() => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error al guardar",
            showConfirmButton: false,
            timer: 1500,
            width: '20vw',
            padding: '20px',
          });
          return [];
        })).subscribe((res) => {
        console.log(`Cuota creada: ${res}`);
      });
  
      nCuota++;
      FechaV = this.sumarUnMes(FechaV);
    }
  }
  

  
  esBisiesto(anio: number): boolean {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  }

  sumarUnMes(fecha: string): string {
    const dias_meses = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const formato = fecha.indexOf('/') !== -1 ? '/' : '-';
    const partesFecha = fecha.split(formato);
    let dia = parseInt(partesFecha[0]);
    let mes = parseInt(partesFecha[1]);
    let anio = parseInt(partesFecha[2]);
    
    mes++;
    if (mes === 13) {
      mes = 1;
      anio++;
    }
    if (dia >= dias_meses[mes - 1]) {
      dia = dias_meses[mes]
      if (mes == 2 && this.esBisiesto(anio)) {
        dia = 29;
      }
      if (mes == 1) {
        dia = 31
      }
    }

    if (mes === 3 && this.esBisiesto(anio) && dia == 29) {
      dia = 31;
    }
    
    const nuevaFecha = `${dia < 10 ? '0' + dia : dia}${formato}${mes < 10 ? '0' + mes : mes}${formato}${anio}`;
    return nuevaFecha;
  }
}
