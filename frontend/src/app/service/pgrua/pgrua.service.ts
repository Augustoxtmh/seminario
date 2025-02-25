import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PGrua } from 'src/app/models/pgrua';

@Injectable({
  providedIn: 'root'
})
export class PgruaService {
url = "http://localhost:3000/pedidosgrua"
  
  constructor(private http: HttpClient) { }

  public getAllPedidogrua(): Observable<PGrua[]> {
    return this.http.get<PGrua[]>(this.url);
  }


  public getPedidogruaPorNPoliza(NPoliza: number): Observable<PGrua> {
    const params = { NPoliza };
    return this.http.get<PGrua>(this.url, { params });
  }

  public updatePedidogrua(poliza: PGrua): Observable<any>{
    return this.http.put<any>(this.url, poliza);
  }

  public createPedidogrua(poliza: PGrua): Observable<any>{
    return this.http.post<any>(this.url, poliza)
  }

  public deletePedidogrua(poliza: PGrua): Observable<any>{
    return this.http.delete<any>(this.url + poliza.PedidoID);
  }
}
