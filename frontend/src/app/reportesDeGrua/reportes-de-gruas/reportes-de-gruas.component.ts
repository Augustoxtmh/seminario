import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Gruero } from 'src/app/models/gruero';
import { PGrua } from 'src/app/models/pgrua';
import { GrueroService } from 'src/app/service/gruero/gruero.service';
import { PgruaService } from 'src/app/service/pgrua/pgrua.service';

@Component({
  selector: 'app-reportes-de-gruas',
  templateUrl: './reportes-de-gruas.component.html',
  styleUrls: ['./reportes-de-gruas.component.css']
})
export class ReportesDeGruasComponent implements OnInit {

  pedidosPorGruero: any;
  pagosPorGruero: { gruero: string, totalPagado: number }[] = [];
  grueros: Gruero[] = [];
  montosRestantes: number = 0;
  facturasRestantes: number = 0;

  pedidosPorDia = {
    tooltip: { trigger: 'axis' },
    xAxis: { 
      type: 'category', 
      data: [] as string[]
    },
    yAxis: { type: 'value' },
    series: [
      { 
        name: 'Pedidos', 
        type: 'bar', 
        data: [] as number[]
      }
    ]
  };

  constructor(private pedidoGruaServ: PgruaService, private gruerosServ: GrueroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gruerosServ.getAllGrueros().subscribe((res) => {
      this.grueros = res;
      this.pedidoGruaServ.getAllPedidogrua().subscribe((data: PGrua[]) => {
        this.processData(data);
        this.processDataGrueros(data);
        this.cdr.detectChanges();
      });
    });
  }

  processData(data: PGrua[]): void {
    const dates: string[] = [];
    const pedidos: number[] = [];
  
    data.forEach(pedido => {
      const fechaObj = new Date(pedido.FechaHoraPedido);
      const fecha = fechaObj.toLocaleDateString();
  
      if (fechaObj.getMonth() === new Date().getMonth()) {
        if (!dates.includes(fecha)) {
          dates.push(fecha);
          pedidos.push(1);
        } else {
          const index = dates.indexOf(fecha);
          pedidos[index] += 1;
        }
      }
    });

    if (dates.length > 0 && pedidos.length > 0) {
      this.pedidosPorDia = {
        ...this.pedidosPorDia,
        xAxis: { ...this.pedidosPorDia.xAxis, data: dates },
        series: [{ ...this.pedidosPorDia.series[0], data: pedidos }]
      };
    }
  }
  
  processDataGrueros(data: PGrua[]): void {
    const pedidosPorGruero: { [key: string]: number } = {};
    const pagosPorGruero: { [key: string]: number } = {};
  
    data.forEach(pedido => {
      const fechaObj = new Date(pedido.FechaHoraPedido);
      
      if (fechaObj.getMonth() === new Date().getMonth()) {
        const grueroId = pedido.GrueroID.toString();
        const monto = pedido.Monto || 0;
        
        if (!pedido.Monto || pedido.Monto === 0) this.montosRestantes++;
        if (!pedido.urlFactura || pedido.urlFactura === "") this.facturasRestantes++;
        
        pedidosPorGruero[grueroId] = (pedidosPorGruero[grueroId] || 0) + 1;
        pagosPorGruero[grueroId] = (pagosPorGruero[grueroId] || 0) + Number(monto);
      }
    });

    if (this.grueros.length > 0) {
      this.pedidosPorGruero = {
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [{
          name: 'Pedidos',
          type: 'pie',
          radius: '50%',
          data: Object.keys(pedidosPorGruero).map(id => {
            const gruero = this.grueros.find(g => g.GrueroID === Number(id));
            return {
              name: gruero ? gruero.NombreGruero : 'Desconocido',
              value: pedidosPorGruero[id] ?? 'N/A'
            };
          })
        }]
      };

      this.pagosPorGruero = Object.entries(pagosPorGruero).map(([grueroId, total]) => {
        const gruero = this.grueros.find(g => g.GrueroID === Number(grueroId));
        return {
          gruero: gruero ? gruero.NombreGruero.toString() : 'Desconocido',
          totalPagado: total
        };
      });
    }
    
    this.cdr.detectChanges();
  }
}
