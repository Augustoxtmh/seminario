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


  constructor(private fb: FormBuilder, private pGruaServ: PgruaService,
      private vehiculoServ: VehiculoService, private grueroServ: GrueroService,
      private router: Router, private uploadService: UploadService,)
  {
    const navigation = this.router.getCurrentNavigation();
    this.pedidoGruaRecibido = navigation?.extras.state?.['pgrua'];
    
    const gruero = navigation?.extras.state?.['grueroN'];;

    this.formularioPGrua = this.fb.group({
      gruero: [
        gruero,
        [Validators.required]
      ],
      nCliente: [
        this.pedidoGruaRecibido.NombreCliente,
        [Validators.required],
      ],
      fecha: [
        this.formatearFecha(this.pedidoGruaRecibido.FechaHoraPedido),
        [Validators.required],
      ],
      patente: [
        this.pedidoGruaRecibido.Patente,
        [Validators.required],
      ],}
    )
  }

  onSave() {
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

    this.grueroServ.getGrueroPorNombre(gruero).subscribe((res: Gruero) => {

      grueroId = res.GrueroID ?? 0;

      this.pGruaServ.updatePedidogrua(new PGrua(nombreCliente, fechaE, patente, true, grueroId, 1, this.pedidoGruaRecibido.PedidoID)
      ).subscribe((res) => {
        this.router.navigate(['/verPedidosDeGrua']);
        console.log('Pedido guardado:', res);
      });
    })
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
    this.grueroServ.getAllGrueros().subscribe(
      (grueros) => {
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

  onBack()
  {
    this.pedidoGruaRecibido = new PGrua('', new Date(), '', true, 0, 0, 0)
    this.router.navigate(['/verPedidosDeGrua']);
  }

  onDelete()
  {
    this.pGruaServ.deletePedidogrua(this.pedidoGruaRecibido).pipe(
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
      ).subscribe(() => {
        this.onBack()
        this.router.navigate(['/verPedidosDeGrua']);
    });
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

    this.uploadService.uploadFile(this.selectedFile, Number(this.pedidoGruaRecibido.PedidoID?.valueOf() ?? 0)).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      alert('PDF subido correctamente');
    }, error => {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un error al subir el archivo');
    });
  }
}
