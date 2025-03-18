import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  url = "http://localhost:3000/vehiculos"
  
  constructor(private http: HttpClient) { }

  public getAllVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.url);
  }

  public getVehiculoPorId(DPatente: number): Observable<Vehiculo> {
    const params = { DPatente };
    return this.http.get<Vehiculo>(this.url, { params });
  }

  public getVehiculoPorPatente(SPatente: string): Observable<Vehiculo> {
    const params = { SPatente };
    return this.http.get<Vehiculo>(this.url, { params });
  }

  public getVehiculosPorPatente(MPatente: string): Observable<String[]> {
    const params = { MPatente };
    return this.http.get<String[]>(this.url, { params });
  }

  public createVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.post<any>(this.url, vehiculo);
  }

  public updateVehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http.put<any>(this.url, vehiculo);
  }
  
  public deleteVehiculo(DPatente: string): Observable<any> {
    console.log(DPatente)
    return this.http.put<any>(this.url + '/unable/' + DPatente, {});
  }  
  
}
