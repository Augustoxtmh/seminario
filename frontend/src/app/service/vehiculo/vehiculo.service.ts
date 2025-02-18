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

  public getVehiculoPorId(Id: number): Observable<Vehiculo> {
    const params = { Id };
    return this.http.get<Vehiculo>(this.url, { params });
  }

  public updateVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.put<any>(this.url, vehiculo);
  }

  public createVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.post<any>(this.url, vehiculo)
  }

  public deleteVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.delete<any>(this.url + vehiculo.Patente);
  }
  
}
