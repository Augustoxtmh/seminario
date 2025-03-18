import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuota } from 'src/app/models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {
  url = "http://localhost:3000/cuota"
  
  constructor(private http: HttpClient) { }

  public getAllCuota(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(this.url);
  }

  public getCuotaPorId(Id: number): Observable<Cuota> {
    const params = { Id };
    return this.http.get<Cuota>(this.url, { params });
  }

  public getValidezByPatente(patente: String): Observable<{ valido: boolean; errores: string[] }> {
    return this.http.get<{ valido: boolean; errores: string[] }>(this.url + '/poliza/' + patente);
  }  

  public updateCuota(cuota: Cuota): Observable<any>{
    return this.http.put<any>(this.url, cuota);
  }

  public createCuota(cuota: Cuota): Observable<any>{
    return this.http.post<any>(this.url, cuota)
  }

  public deleteCuota(cuota: Cuota): Observable<any>{
    return this.http.delete<any>(this.url + cuota.cuotaId);
  }
}
