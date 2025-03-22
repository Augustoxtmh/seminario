import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs';
import { Cuota } from 'src/app/models/cuota';
import { Poliza } from 'src/app/models/poliza';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import { PolizaService } from 'src/app/service/poliza/poliza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-cuota',
  templateUrl: './modificar-cuota.component.html',
  styleUrls: ['./modificar-cuota.component.css']
})
export class ModificarCuotaComponent {
  formularioCuota: FormGroup;
  cuotaRecibida: Cuota;
  polizasSugeridas: String[] = [];
  polizaSeleccionada = false;
  errores: string[] = [];
  
  constructor(
    private fb: FormBuilder, 
    private cuotaServ: CuotaService,
    private router: Router,
    private polizaServ: PolizaService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.cuotaRecibida = navigation?.extras.state?.['cuota'];

    this.formularioCuota = this.fb.group({
      NumCuota: [this.cuotaRecibida?.NumCuota, [Validators.required, Validators.min(0)]],
      FechaVencimiento: [this.cuotaRecibida?.FechaVencimiento, [Validators.required]],
      Monto: [this.cuotaRecibida?.Monto, [Validators.required, Validators.min(1)]],
      NumeroPoliza: [this.cuotaRecibida?.NumeroPoliza, [Validators.required]],
      UsuarioId: [this.cuotaRecibida?.UsuarioId, [Validators.required]]
    });
  }

  onSave() {
    if(JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A')
    {
      if (this.formularioCuota.valid) {
        const cuota = new Cuota(
          this.formularioCuota.value.NumCuota,
          this.formularioCuota.value.FechaVencimiento,
          this.formularioCuota.value.Monto,
          this.formularioCuota.value.NumeroPoliza,
          this.cuotaRecibida.UsuarioId,
          this.cuotaRecibida.cuotaId
        );
  
        this.cuotaServ.updateCuota(cuota).pipe(
          catchError(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al guardar',
              showConfirmButton: false,
              timer: 1500,
              width: '20vw',
              padding: '20px',
            });
            return [];
          })
        ).subscribe(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizado con éxito',
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
          this.router.navigate(['/verCuotas']);
        });
      }
    }
    else
    {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Permisos insuficientes',
        showConfirmButton: false,
        timer: 1500,
        width: '20vw',
        padding: '20px',
      });
    }
  }

  onBack() {
    this.router.navigate(['/verCuotas']);
  }

  onDelete() {
    if(JSON.parse(localStorage.getItem("User") || '{}').Autoridad == 'A')
    {
      return Swal.fire({
        title: '¿Seguro que quiere borrar esta cuota?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
          this.cuotaServ.deleteCuota(this.cuotaRecibida).pipe(
            catchError(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al eliminar',
                showConfirmButton: false,
                timer: 1500,
                width: '20vw',
                padding: '20px',
              });
              return [];
            })
          ).subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminado con éxito',
              showConfirmButton: false,
              timer: 1500,
              width: '25vw',
              padding: '20px',
            });
            this.router.navigate(['/verCuotas']);
          });
        }
      });
    }
    else
    {
      return Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Permisos insuficientes',
        showConfirmButton: false,
        timer: 1500,
        width: '20vw',
        padding: '20px',
      });
    }
  }

  onPolizaInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    
    if (value.length > 1) {
      this.buscarPolizas(value);
    } else {
      this.polizasSugeridas = [];
    }
  }

  buscarPolizas(query: string) {
    this.polizaServ.getPolizasPorNPoliza(Number(query)).pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener recomendaciones",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((vehiculos: String[]) => {
      this.polizasSugeridas = vehiculos.map(poliza => poliza); 
    });
  }
  
  
  setValuePoliza(poliza: String) {
    this.polizaSeleccionada = true;
    this.formularioCuota.controls['NumeroPoliza'].setValue(poliza);
    this.polizasSugeridas = [];
  }  
}
