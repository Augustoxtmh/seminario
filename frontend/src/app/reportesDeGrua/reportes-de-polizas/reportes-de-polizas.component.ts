import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Cuota } from 'src/app/models/cuota';
import { PGrua } from 'src/app/models/pgrua';
import { Usuario } from 'src/app/models/usuario';
import { CuotaService } from 'src/app/service/cuota/cuota.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-reportes-de-polizas',
  templateUrl: './reportes-de-polizas.component.html',
  styleUrls: ['./reportes-de-polizas.component.css']
})
export class ReportesDePolizasComponent implements OnInit {
  cuotasGeneradasMes: number = 0;
  montoTotalCuotas: number = 0;
  beneficioTotal: number = 0;
  usuarios: Usuario[] = []

  cuotasPorDia = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: [] as string[] },
    yAxis: { type: 'value' },
    series: [{ name: 'Cuotas', type: 'bar', data: [] as number[] }]
  };

  cuotasPorUsuario: any = {
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [{
      name: 'Cuotas',
      type: 'pie',
      radius: '50%',
      data: [] as { name: string, value: number }[]
    }]
  };

  constructor(
    private cuotaService: CuotaService,
    private pedidoGruaService: PgruaService,
    private cdr: ChangeDetectorRef,
    private usuarioServ: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioServ.getAllUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
  
      this.cuotaService.getAllCuota().subscribe((cuotas: Cuota[]) => {
        this.processCuotas(cuotas);
  
        this.pedidoGruaService.getAllPedidogrua().subscribe((pedidos) => {
          this.processPedidos(pedidos);
        });
      });
    });
  }

  processCuotas(cuotas: Cuota[]): void {
    const cuotasPorDia: { [key: string]: number } = {};
    const cuotasPorUsuario: { [key: string]: number } = {};
    let montoTotal = 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    cuotas.forEach((cuota) => {
      const fechaObj = new Date(cuota.FechaVencimiento);
      const fechaStr = fechaObj.toLocaleDateString();
      let mesAnterior = fechaObj.getMonth() - 1;
      if (mesAnterior == 0)
        mesAnterior = 12;
      if (mesAnterior === currentMonth && fechaObj.getFullYear() === currentYear) {
        montoTotal += Number(cuota.Monto);

        cuotasPorDia[fechaStr] = (cuotasPorDia[fechaStr] || 0) + 1;
        cuotasPorUsuario[cuota.UsuarioId.toString()] = 
          (cuotasPorUsuario[cuota.UsuarioId.toString()] || 0) + Number(cuota.Monto);
      }

      if (fechaObj.getMonth() === currentMonth && fechaObj.getFullYear() === currentYear) 
        this.cuotasGeneradasMes++;
      
    });

    this.montoTotalCuotas = montoTotal;

    this.cuotasPorDia = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: Object.keys(cuotasPorDia) },
      yAxis: { type: 'value' },
      series: [{ name: 'Cuotas', type: 'bar', data: Object.values(cuotasPorDia) }]
    };

    this.cuotasPorUsuario = {
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [{
        name: 'Cuotas',
        type: 'pie',
        radius: '50%',
        data: Object.entries(cuotasPorUsuario).map(([usuarioId, monto]) => {
          const usuario = this.usuarios.find(u => u.UsuarioId == Number(usuarioId));
          return {
            name: usuario ? usuario.Nombre : 'Desconocido',
            value: monto
          };
        })
      }]
    };
    

    this.cdr.detectChanges();
  }

  processPedidos(pedidos: PGrua[]): void {
    let montoTotalPedidos = 0;
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    pedidos.forEach(pedido => {
      const fechaObj = new Date(pedido.FechaHoraPedido);
      if (fechaObj.getMonth() === currentMonth && fechaObj.getFullYear() === currentYear && pedido.DeAlta) {
        montoTotalPedidos += pedido.Monto ? Number(pedido.Monto) : 0;
      }
    });

    this.beneficioTotal = this.montoTotalCuotas - montoTotalPedidos;
    this.cdr.detectChanges();
  }
}
