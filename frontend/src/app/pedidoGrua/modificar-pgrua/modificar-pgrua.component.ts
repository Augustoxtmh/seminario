import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Gruero } from 'src/app/models/gruero';
import { PGrua } from 'src/app/models/pgrua';
import { Poliza } from 'src/app/models/poliza';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';
import { VehiculoService } from 'src/app/service/vehiculo/vehiculo.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-pgrua',
  templateUrl: './modificar-pgrua.component.html',
  styleUrls: ['./modificar-pgrua.component.css']
})
export class ModificarPGruaComponent {

  patentesSugeridas: String[] = [];
  grueroSugerido: String[] = [];
  formularioPGrua: FormGroup;
  polizas: Poliza[] = [];
  pedidoGruaRecibido: PGrua;
  date: Date = new Date();
  selectedFile!: File;
  grueroSeleccionado: boolean = false;
  baseUrl = 'http://localhost:3000';

  constructor(private fb: FormBuilder, private pGruaServ: PgruaService,
      private vehiculoServ: VehiculoService, private grueroServ: GrueroService,
      private router: Router, private uploadService: UploadService,)
  {
    const navigation = this.router.getCurrentNavigation();
    this.pedidoGruaRecibido = navigation?.extras.state?.['pgrua'];
    console.log(this.pedidoGruaRecibido.urlFactura == null);
    const gruero = navigation?.extras.state?.['grueroN'];;

    this.formularioPGrua = this.fb.group({
      gruero: [
        gruero,
        [Validators.required, Validators.minLength(5)],
      ],
      nCliente: [
        this.pedidoGruaRecibido.NombreCliente,
        [Validators.required, Validators.minLength(7)],,
      ],
      fecha: [
        this.formatearFecha(this.pedidoGruaRecibido.FechaHoraPedido),
        [Validators.required],
      ],
      patente: [
        this.pedidoGruaRecibido.Patente,
        [Validators.required, Validators.minLength(4)],,
      ],}
    )
  }

  onSave() {
    if(this.formularioPGrua.valid)
    {
      console.log('guardando');
      console.log(this.pedidoGruaRecibido);

      const gruero = this.formularioPGrua.controls['gruero'].value;
      const nombreCliente = this.formularioPGrua.controls['nCliente'].value;
      const fecha = this.formularioPGrua.controls['fecha'].value;
      const patente = this.formularioPGrua.controls['patente'].value;
      const formato = fecha.indexOf('/') !== -1 ? '/' : '-';
      const partesFecha = fecha.split(formato);
      let grueroId: Number = 0;
      let fechaE: Date = new Date();

      if (gruero == '' || nombreCliente == '' || fecha == '' || patente == '') {
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
            title: "Error al actualizar",
            showConfirmButton: false,
            timer: 1500,
            width: '20vw',
            padding: '20px',
          });
          return [];
        })
      ).subscribe((res) => {
        grueroId = res.GrueroID ?? 0;

        this.pGruaServ.updatePedidogrua(new PGrua(nombreCliente, fechaE, patente, true, grueroId, 1, this.pedidoGruaRecibido.PedidoID)
        ).pipe(
          catchError(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al actualizar",
              showConfirmButton: false,
              timer: 1500,
              width: '20vw',
              padding: '20px',
            });
            return [];
          })
        ).subscribe((res) => {

          this.router.navigate(['/verPedidosDeGrua']);
          console.log('Pedido guardado:', res);
          
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Actualizado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
        });
      });
    }
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toISOString().split('T')[0];
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
    this.patentesSugeridas = [];
  }  

  buscarPatentes(query: string) {
    this.vehiculoServ.getVehiculosPorPatente(query).subscribe(
      (vehiculos: String[]) => {
        this.patentesSugeridas = vehiculos.map(vehiculo => vehiculo);
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
          title: "Error al guardar",
          showConfirmButton: false,
          timer: 1500,
          width: '20vw',
          padding: '20px',
        });
        return [];
      })
    ).subscribe((res) => {

      this.grueroSugerido = res
        .map(gruero => gruero.NombreGruero)
        .filter(nombre => nombre.toLowerCase().includes(value.toLowerCase()));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Creado con exito",
        showConfirmButton: false,
        timer: 1500,
        width: '25vw',
        padding: '20px',
      });
    });
  }
  
  setValueGruero(nombre: String) {
    this.formularioPGrua.controls['gruero'].setValue(nombre);
    this.grueroSugerido = [];
  }

  onBack()
  {
    this.pedidoGruaRecibido = new PGrua('', new Date(), '', true, 0, 0, 0)
    this.router.navigate(['/verPedidosDeGrua']);
  }

  onDelete()
  {
    return Swal.fire({
      title: '¿Seguro que quiere borrar el pedido?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      }).then(result => {
        if (result.isConfirmed) {
        this.pGruaServ.deletePedidogrua(this.pedidoGruaRecibido).pipe(
          catchError(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al borrar",
              showConfirmButton: false,
              timer: 1500,
              width: '20vw',
              padding: '20px',
            });
            return [];
          })
          ).subscribe(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Borrado con exito",
              showConfirmButton: false,
              timer: 1500,
              width: '25vw',
              padding: '20px',
            });
            this.onBack()
            this.router.navigate(['/verPedidosDeGrua']);
        });
      }
    })
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Por favor selecciona un archivo PDF válido');
    }
  }
  
  uploadPDF() {
    if (!this.selectedFile) {
      alert('No has seleccionado ningún archivo');
      return;
    }
  
    this.uploadService.uploadFile(this.selectedFile, Number(this.pedidoGruaRecibido.PedidoID?.valueOf() ?? 0)).pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al subir",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
        return [];
      })
      ).subscribe((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Subido con exito",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
        this.pedidoGruaRecibido.urlFactura = res.filePath;
    });
  }

  guardarMonto(){
    const monto: number = Number((document.getElementById('monto') as HTMLInputElement).value.trim());
    this.pGruaServ.updateMontoPGrua(Number(this.pedidoGruaRecibido.PedidoID ?? 0), monto).pipe(
      catchError(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al guardar",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
        return [];
      })
      ).subscribe(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Guardado con exito",
          showConfirmButton: false,
          timer: 1500,
          width: '25vw',
          padding: '20px',
        });
    });
  }
}


/*
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Guardado con exito",
            showConfirmButton: false,
            timer: 1500,
            width: '25vw',
            padding: '20px',
          });
*/