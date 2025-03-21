import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { PGrua } from 'src/app/models/pgrua';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { ModalGrueroService } from 'src/app/service/modals/modalGruero/modal-gruero.service';
import { ModalVehiculoService } from 'src/app/service/modals/modalVehiculo/modal-vehiculo.service';
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
  grueroSeleccionado: boolean = false;
  vehiculoSeleccionado: boolean = false;
  date: Date = new Date();
  errores: string[] = [];

  constructor(private fb: FormBuilder, private pGruaServ: PgruaService,
      private vehiculoServ: VehiculoService, private grueroServ: GrueroService,
      private cuotaServ: CuotaService, private router: Router
      , private grueroModalServ: ModalGrueroService, private vehiculoModalServ: ModalVehiculoService)
  {
    this.formularioPGrua = this.fb.group({
      gruero: [
        '',
        [Validators.required, Validators.minLength(5)],
      ],
      nCliente: [
        '',
        [Validators.required, Validators.minLength(7)],,
      ],
      fecha: [
        this.formatearFecha(this.date),
        [Validators.required],
      ],
      patente: [
        '',
        [Validators.required, Validators.minLength(4)],,
      ],}
    )
  }

  onSubmit() {
    if(this.formularioPGrua.valid)
    {
      console.log('creando');

      const gruero = this.formularioPGrua.controls['gruero'].value;
      const nombreCliente = this.formularioPGrua.controls['nCliente'].value;
      const fecha = this.formularioPGrua.controls['fecha'].value;
      const patente = this.formularioPGrua.controls['patente'].value;
      const formato = fecha.indexOf('/') !== -1 ? '/' : '-';
      const partesFecha = fecha.split(formato);
      let grueroId: Number = 0;
      let fechaE: Date = new Date();

      if (gruero == '' || nombreCliente == '' || patente == '' || fecha == '') {
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
              title: "Error al asignar el gruero",
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

          this.pGruaServ.createPedidogrua(new PGrua(nombreCliente, fechaE, patente, true, grueroId, JSON.parse(localStorage.getItem("User") || '{}').UsuarioId)
          ).pipe(
            catchError(() => {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error al crear el pedido de grúa, revise los datos",
                showConfirmButton: false,
                timer: 3500,
                width: '25vw',
                padding: '20px',
              });
              console.log('error')
              return [];
            })
          ).subscribe((res) => {
            this.router.navigate(['/verPedidosDeGrua']);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Creado con exito",
              showConfirmButton: false,
              timer: 1500,
              width: '25vw',
              padding: '20px',
            });
            console.log('Pedido creado:', res);
          });
        })
    }
  }

  onPatenteInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    
    if (value.length > 1) {
      this.buscarPatentes(value);
    } else {
      this.patentesSugeridas = [];
    }
  }
  
  setValuePatente(patente: String) {
    this.vehiculoSeleccionado = true;
    this.formularioPGrua.controls['patente'].setValue(patente);
    this.cuotaServ.getValidezByPatente(patente).pipe(
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
      })).subscribe((vehiculos: String[]) => {
        this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
      }
    )
  }
    

  onGrueroInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
  
    if (value.length > 1) {
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
    this.grueroSeleccionado = true;
    console.log(this.grueroSeleccionado)
    this.grueroSugerido = [];
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toISOString().split('T')[0];
  }  

  openGrueroModal() {
    this.grueroModalServ.openFormModal();
  }

  openVehiculoModal() {
    this.vehiculoModalServ.openFormModal();
  }
}