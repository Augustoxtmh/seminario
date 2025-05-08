import { Component, OnInit } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import jsPDF from "jspdf"
import { firstValueFrom, catchError, map, throwError } from "rxjs"
import { Cuota } from "src/app/models/cuota"
import { Poliza } from "src/app/models/poliza"
import { CuotaService } from "src/app/service/cuota/cuota.service"
import { PgruaService } from "src/app/service/pgrua/pgrua.service"
import { PolizaService } from "src/app/service/poliza/poliza.service"
import { VehiculoService } from "src/app/service/vehiculo/vehiculo.service"
import Swal from "sweetalert2"

@Component({
  selector: "app-generador-cuota",
  templateUrl: "./generador-cuota.component.html",
  styleUrls: ["./generador-cuota.component.css"],
})
export class GeneradorCuotaComponent implements OnInit {
  polizaRecibida: Poliza
  formularioCuota: FormGroup
  polizas: Poliza[] = []
  date: Date = new Date()
  doc = new jsPDF()
  cuotasData: any[] = []

  constructor(
    private fb: FormBuilder,
    private cuotaServ: CuotaService,
    private router: Router,
    private polizaServ: PolizaService,
    private vehiculoServ: VehiculoService,
    private pedidoGrua: PgruaService,
  ) {
    const navigation = this.router.getCurrentNavigation()
    this.polizaRecibida = navigation?.extras.state?.["poliza"]

    const fechaV = this.polizaRecibida?.Vigencia ? new Date(this.polizaRecibida.Vigencia) : new Date()
    fechaV.setMonth(fechaV.getMonth() + 2)

    this.formularioCuota = this.fb.group({
      poliza: [
        this.polizaRecibida?.NumeroPoliza,
        [Validators.required, Validators.minLength(7), Validators.pattern("^\\d+$")],
      ],
      nCuota: ["0", [Validators.required, Validators.maxLength(1), Validators.pattern("^\\d+$")]],
      Cantidad: ["1", [Validators.required, Validators.maxLength(1), Validators.pattern("^\\d+$")]],
      FechaV: [fechaV.getDate() + "/" + fechaV.getMonth() + "/" + fechaV.getFullYear(), [Validators.required]],
      Monto: ["", [Validators.required, Validators.minLength(1), Validators.pattern("^\\d+$")]],
    })
  }

  ngOnInit(): void {
    this.polizaRecibida = JSON.parse(localStorage.getItem("Poliza") || "{}")
  }

  sumarUnMes(fecha: string): string {
    const dias_meses = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const formato = fecha.indexOf("/") !== -1 ? "/" : "-"
    const partesFecha = fecha.split(formato)
    let dia = Number.parseInt(partesFecha[0])
    let mes = Number.parseInt(partesFecha[1])
    let anio = Number.parseInt(partesFecha[2])

    mes++
    if (mes === 13) {
      mes = 1
      anio++
    }
    if (dia >= dias_meses[mes - 1]) {
      dia = dias_meses[mes]
      if (mes == 2 && this.esBisiesto(anio)) {
        dia = 29
      }
      if (mes == 1) {
        dia = 31
      }
    }

    if (mes === 3 && this.esBisiesto(anio) && dia == 29) {
      dia = 31
    }

    const nuevaFecha = `${dia < 10 ? "0" + dia : dia}${formato}${mes < 10 ? "0" + mes : mes}${formato}${anio}`
    return nuevaFecha
  }

  async onSubmit() {
    if (this.formularioCuota.valid) {
      const Monto = this.formularioCuota.controls["Monto"].value
      const poliza = this.formularioCuota.controls["poliza"].value
      const idUsuario = Number(this.polizaRecibida.UsuarioId)
      const cantidadTotal = Number.parseInt(this.formularioCuota.controls["Cantidad"].value)
      let nCuota = Number.parseInt(this.formularioCuota.controls["nCuota"].value)
      let FechaV = this.formularioCuota.controls["FechaV"].value
      let patente: String = ""
      let nombre: String = ""
      let tipo: String = ""
      let pedidosRealizados = 0

      this.cuotasData = []

      try {
        const resPoliza = await firstValueFrom(
          this.polizaServ.getPolizaPorNPoliza(poliza).pipe(
            catchError((err) => {
              return []
            }),
          ),
        )

        if (resPoliza && resPoliza.Patente) {
          patente = resPoliza.Patente

          const resVehiculo = await firstValueFrom(
            this.vehiculoServ.getVehiculoPorPatente(resPoliza.Patente.toString()).pipe(
              catchError(() => {
                return []
              }),
            ),
          )

          if (resVehiculo) {
            tipo = resVehiculo.TipoPlan
            nombre = resVehiculo.Nombre
          }
        }
      } catch (error) {
        console.error("Error:", error)
      }

      if (nCuota < 0 || nCuota > 5 || cantidadTotal == 0 || FechaV == "" || Monto == "" || poliza == "") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Todos los campos son requeridos",
          showConfirmButton: false,
          timer: 1500,
          width: "25vw",
          padding: "20px",
        })
        return
      }

      if (nCuota + cantidadTotal > 6) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "El número de cuota superará el máximo",
          showConfirmButton: false,
          timer: 1500,
          width: "25vw",
          padding: "20px",
        })
        return
      }

      const promises = []

      const pedidosPromise = new Promise<void>((resolve, reject) => {
        this.pedidoGrua
          .getPedidogruaPorPatente(patente.valueOf())
          .pipe(
            map((pedidos) => {
              const pedidosTotal = pedidos.length
              return pedidosTotal
            }),
            catchError((error) => {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error al traer los pedidos de grúa realizados",
                showConfirmButton: false,
                timer: 1500,
                width: "25vw",
                padding: "20px",
              })
              return throwError(() => error)
            }),
          )
          .subscribe({
            next: (cantidadPedidos) => {
              pedidosRealizados = cantidadPedidos
              resolve()
            },
            error: (error) => {
              reject(error)
            },
          })
      })

      promises.push(pedidosPromise)

      for (let index = 0; index < cantidadTotal; index++) {
        const formato = FechaV.indexOf("/") !== -1 ? "/" : "-"
        const partesFecha = FechaV.split(formato)
        const dia = Number.parseInt(partesFecha[0])
        const mes = Number.parseInt(partesFecha[1]) - 1
        const anio = Number.parseInt(partesFecha[2])
        const fecha = new Date(anio, mes, dia)

        const cuotaActual = nCuota

        const promise = new Promise<void>((resolve, reject) => {
          this.cuotaServ
            .createCuota(
              new Cuota(cuotaActual, fecha, Monto, poliza, JSON.parse(localStorage.getItem("User") || "{}").UsuarioId),
            )
            .pipe(
              catchError((error) => {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Error al crear la cuota",
                  showConfirmButton: false,
                  timer: 1500,
                  width: "25vw",
                  padding: "20px",
                })
                reject(error)
                return []
              }),
            )
            .subscribe(() => {
              this.cuotasData.push({
                nCuota: cuotaActual,
                fecha: fecha,
                Monto: Monto,
                poliza: poliza,
                patente: patente,
                nombre: nombre,
                pedidosRealizados: pedidosRealizados,
                tipo: tipo,
              })
              resolve()
            })
        })

        promises.push(promise)

        nCuota++
        FechaV = this.sumarUnMes(FechaV)
      }

      try {
        await Promise.all(promises)

        this.generarPDFConCuotas(cantidadTotal, nombre, FechaV)
      } catch (error) {
        console.error("Error al procesar las cuotas:", error)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al procesar las cuotas",
          showConfirmButton: false,
          timer: 1500,
          width: "25vw",
          padding: "20px",
        })
      }
    }
  }

  generarPDFConCuotas(cantidadTotal: number, nombre: String, fechaUltima: string) {
    this.doc = new jsPDF()

    this.cuotasData.sort((a, b) => a.nCuota - b.nCuota)

    for (let i = 0; i < this.cuotasData.length; i += 2) {
      if (i + 1 < this.cuotasData.length) {
        this.doc.addImage("../../../assets/cuotaDoble.jpg", "JPG", 0, 0, 210, 297)

        const cuota1 = this.cuotasData[i]
        this.colocarTexto(
          cuota1.nCuota,
          cuota1.fecha,
          cuota1.Monto,
          cuota1.poliza,
          31,
          22,
          cuota1.fecha,
          cuota1.patente,
          cuota1.nombre,
          cuota1.pedidosRealizados,
          cuota1.tipo,
        )

        const cuota2 = this.cuotasData[i + 1]
        this.colocarTexto(
          cuota2.nCuota,
          cuota2.fecha,
          cuota2.Monto,
          cuota2.poliza,
          129,
          22,
          cuota2.fecha,
          cuota2.patente,
          cuota2.nombre,
          cuota2.pedidosRealizados,
          cuota2.tipo,
        )

        if (i + 2 < this.cuotasData.length) {
          this.doc.addPage()
        }
      } else {
        this.doc.addImage("../../../assets/cuotaSola.jpg", "JPG", 0, 0, 210, 297)

        const cuota = this.cuotasData[i]
        this.colocarTexto(
          cuota.nCuota,
          cuota.fecha,
          cuota.Monto,
          cuota.poliza,
          31,
          22,
          cuota.fecha,
          cuota.patente,
          cuota.nombre,
          cuota.pedidosRealizados,
          cuota.tipo,
        )
      }
    }

    this.generarDocumentoPDF(nombre, fechaUltima)
  }

  generarDocumentoPDF(nombre: String, fecha: string) {
    const nombreInicial = nombre && nombre.length > 0 ? nombre[0] : "C"
    const polizaInicial =
      this.polizaRecibida && this.polizaRecibida.NumeroPoliza && this.polizaRecibida.NumeroPoliza.length > 0
        ? this.polizaRecibida.NumeroPoliza[0]
        : "P"
    const telefonoInicial =
      this.polizaRecibida && this.polizaRecibida.Telefono && this.polizaRecibida.Telefono.length > 0
        ? this.polizaRecibida.Telefono[0]
        : "T"

    const nombreArchivo = `${nombreInicial}${polizaInicial}${telefonoInicial}${fecha}Cupon_Pago.pdf`

    this.doc.save(nombreArchivo)
    this.doc = new jsPDF()
  }

  agregarDatosAlPDF(
    nCuota: number,
    fecha: Date,
    Monto: string,
    poliza: string,
    totalCuotas: number,
    patente: string,
    nombre: string,
    pedidosRealizados: number,
    tipo: string,
  ) {
    console.log(nCuota)
    if (totalCuotas > 1) {
      this.doc.addImage("../../../assets/cuotaDoble.jpg", "JPG", 0, 0, 210, 297)
      this.colocarTexto(nCuota, fecha, Monto, poliza, 31, 22, fecha, patente, nombre, pedidosRealizados, tipo)
      nCuota++
      this.colocarTexto(nCuota, fecha, Monto, poliza, 129, 22, fecha, patente, nombre, pedidosRealizados, tipo)
    } else {
      this.doc.addImage("../../../assets/cuotaSola.jpg", "JPG", 0, 0, 210, 297)
      this.colocarTexto(nCuota, fecha, Monto, poliza, 31, 22, fecha, patente, nombre, pedidosRealizados, tipo)
    }

    if (totalCuotas > 1) this.doc.addPage()
  }

  colocarTexto(
    nCuota: number,
    fecha: Date,
    Monto: string,
    poliza: string,
    x: number,
    y: number,
    fechaA: Date,
    patente: string,
    nombre: string,
    pedidosRealizados: number,
    tipo: string,
  ) {
    let montoPorTipo = ""
    if (tipo === "1") {
      montoPorTipo = "50"
    } else if (tipo === "2") {
      montoPorTipo = "100"
    } else if (tipo === "3") {
      montoPorTipo = "200"
    } else {
      montoPorTipo = Monto
    }
    this.doc.setFontSize(8)
    this.doc.setFont("Helvetica", "normal")

    this.doc.text(fecha.toLocaleDateString(), x + 22, y + 146, { angle: 90 })
    this.doc.text(`${patente}`, x + 11, y + 95, { angle: 90 })
    this.doc.text(`${poliza.toUpperCase()}`, x + 22, y + 106, { angle: 90 })
    this.doc.text(`${nCuota}`, x + 22, y + 168, { angle: 90 })
    this.doc.text(`${Monto}`, x + 34, y + 100, { angle: 90 })
    this.doc.text(`${fechaA.getDate() + "/" + fechaA.getMonth() + "/" + fechaA.getFullYear()}`, x, y + 95, {
      angle: 90,
    })
    this.doc.text(`${nombre.toUpperCase()}`, x + 11, y + 168, { angle: 90 })
    this.doc.text(`${pedidosRealizados.toString()} / 3`, x + 34, y + 168, { angle: 90 })
    this.doc.text(`de ${montoPorTipo}Km`, x + 34, y + 160, { angle: 90 })

    this.doc.text(fecha.toLocaleDateString(), x + 22, y + 241, { angle: 90 })
    this.doc.text(`${patente}`, x + 11, y + 190, { angle: 90 })
    this.doc.text(`${poliza.toUpperCase()}`, x + 22, y + 201, { angle: 90 })
    this.doc.text(`${nCuota}`, x + 22, y + 263, { angle: 90 })
    this.doc.text(`${Monto}`, x + 34, y + 195, { angle: 90 })
    this.doc.text(`${fechaA.getDate() + "/" + fechaA.getMonth() + "/" + fechaA.getFullYear()}`, x, y + 190, {
      angle: 90,
    })
    this.doc.text(`${nombre.toUpperCase()}`, x + 11, y + 263, { angle: 90 })
    this.doc.text(`${pedidosRealizados.toString()} / 3`, x + 34, y + 263, { angle: 90 })
    this.doc.text(`de ${montoPorTipo}Km`, x + 34, y + 255, { angle: 90 })
  }

  esBisiesto(anio: number): boolean {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0
  }
}

