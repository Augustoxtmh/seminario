import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Gruero } from 'src/app/models/gruero';
import { PGrua } from 'src/app/models/pgrua';
import { Poliza } from 'src/app/models/poliza';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-pgrua',
  templateUrl: './agregar-pgrua.component.html',
  styleUrls: ['./agregar-pgrua.component.css']
})
export class AgregarPGruaComponent {

  patentesSugeridas: String[] = [];
  grueroSugerido: String[] = [];
  formularioPGrua: FormGroup;
  date: Date = new Date();
  errores: string[] = [];

  constructor(private fb: FormBuilder, private pGruaServ: PgruaService,
      private vehiculoServ: VehiculoService, private grueroServ: GrueroService,
      private cuotaServ: CuotaService, private cd: ChangeDetectorRef)
  {
    this.formularioPGrua = this.fb.group({
      gruero: [
        '',
        [Validators.required]
      ],
      nCliente: [
        '',
        [Validators.required],
      ],
      fecha: [
        this.formatearFecha(this.date),
        [Validators.required],
      ],
      patente: [
        '',
        [Validators.required],
      ],}
    )
  }

  onSubmit() {
    console.log('creando');

    const gruero = this.formularioPGrua.controls['gruero'].value;
    const nombreCliente = this.formularioPGrua.controls['nCliente'].value;
    const fecha = this.formularioPGrua.controls['fecha'].value;
    const patente = this.formularioPGrua.controls['patente'].value;
    const formato = fecha.indexOf('/') !== -1 ? '/' : '-';
    const partesFecha = fecha.split(formato);
    let grueroId: Number = 0;
    let fechaE: Date = new Date();

    const anio = parseInt(partesFecha[0]);
    const mes = parseInt(partesFecha[1]);
    const dia = parseInt(partesFecha[2]);

    fechaE.setDate(dia);
    fechaE.setMonth(mes - 1);
    fechaE.setFullYear(anio);

    this.grueroServ.getGrueroPorNombre(gruero).pipe(
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
          console.log('error')
          return [];
        })
      ).subscribe((res) => {

        grueroId = res.GrueroID ?? 0;
        
        console.log('prev' + res.GrueroID)
        console.log('Aca:'+nombreCliente, fechaE, patente, true, grueroId, 1)

        this.pGruaServ.createPedidogrua(new PGrua(nombreCliente, fechaE, patente, true, grueroId, 1)
        ).pipe(
          catchError(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al buscar gruero, recuerde agregar el dato",
              showConfirmButton: false,
              timer: 3500,
              width: '25vw',
              padding: '20px',
            });
            console.log('error')
            return [];
          })
        ).subscribe((res) => {
          console.log('Pedido creado:', res);
        });
      })
  }

  onPatenteInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    
    if (value.length > 2) {
      this.buscarPatentes(value);
    } else {
      this.patentesSugeridas = [];
    }
  }
  
  setValuePatente(patente: String) {
    this.formularioPGrua.controls['patente'].setValue(patente);
    this.cuotaServ.getCuotaPorIdByPoliza(patente).pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al colocar el valor",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {
      this.errores = res.errores;
    });    
    this.patentesSugeridas = [];
  }  

  buscarPatentes(query: string) {
    this.vehiculoServ.getVehiculosPorPatente(query).pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener recomendaciónes",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
        ).subscribe((res) => {
          (vehiculos: String[]) => {
            this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
          }
        }
      );
  }

  onGrueroInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
  
    if (value.length > 2) {
      this.buscarGrueros(value);
    } else {
      this.grueroSugerido = [];
    }
  }
  
  buscarGrueros(value: string) {
    this.grueroServ.getAllGrueros().pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener recomendaciónes",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })).subscribe((grueros) => {
      this.grueroSugerido = grueros
        .map(gruero => gruero.NombreGruero)
        .filter(nombre => nombre.toLowerCase().includes(value.toLowerCase()));
      }
    );
  }
  
  setValueGruero(nombre: String) {
    this.formularioPGrua.controls['gruero'].setValue(nombre);
    this.grueroSugerido = [];
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toISOString().split('T')[0];
  }  
}


/* .pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al obtener recomendaciónes",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
        ).subscribe((res) => { */