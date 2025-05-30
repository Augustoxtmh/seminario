import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poliza } from 'src/app/models/poliza';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  url = "http://localhost:3000/polizas"
  
  constructor(private http: HttpClient) { }

  public getAllPoliza(): Observable<Poliza[]> {
    return this.http.get<Poliza[]>(this.url);
  }

  public getPolizaPorNPoliza(NPoliza: number): Observable<Poliza> { 
    return this.http.get<Poliza>(`${this.url}/buscar`, { params: { NPoliza: NPoliza.toString() } });
  }

  public getPolizasPorNPoliza(NPoliza: number): Observable<String[]> { 
    return this.http.get<String[]>(`${this.url}/buscarV`, { params: { NPoliza: NPoliza.toString() } });
  }

  public updatePoliza(poliza: Poliza, VPoliza: String): Observable<any>{
    return this.http.put<any>(this.url + '/actu/' + VPoliza, poliza);
  }

  public createPoliza(poliza: Poliza): Observable<any>{
    return this.http.post<any>(this.url, poliza)
  }

  public deletePoliza(poliza: Poliza): Observable<any>{
    return this.http.delete<any>(this.url + '/' + poliza.NumeroPoliza);
  }
}
