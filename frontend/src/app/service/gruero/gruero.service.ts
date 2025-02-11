import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gruero } from 'src/app/models/gruero';

@Injectable({
  providedIn: 'root'
})
export class GrueroService {
  url = "http://localhost:9090/gruero"
  
  constructor(private http: HttpClient) { }

  public getAllGrueros(): Observable<gruero[]> {
    return this.http.get<gruero[]>(this.url);
  }


  public getGrueroPorId(Id: number): Observable<gruero> {
    const params = { Id };
    return this.http.get<gruero>(this.url, { params });
  }

  public updateGruero(caja_agrosalta: gruero): Observable<any>{
    return this.http.put<any>(this.url, caja_agrosalta);
  }

  public createGruero(caja_agrosalta: gruero): Observable<any>{
    return this.http.post<any>(this.url, caja_agrosalta)
  }

  public deleteGruero(caja_agrosalta: gruero): Observable<any>{
    return this.http.delete<any>(this.url + caja_agrosalta.id);
  }
  
}
