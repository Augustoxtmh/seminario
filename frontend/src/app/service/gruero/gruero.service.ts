import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gruero } from 'src/app/models/gruero';

@Injectable({
  providedIn: 'root'
})
export class GrueroService {
  url = "http://localhost:3000/grueros"
  
  constructor(private http: HttpClient) { }

  public getAllGrueros(): Observable<Gruero[]> {
    return this.http.get<Gruero[]>(this.url);
  }

  public getGrueroPorId(IGruero: number): Observable<Gruero> {
    const params = { IGruero };
    return this.http.get<Gruero>(this.url, { params });
  }

  public getGrueroPorNombre(NGruero: string): Observable<Gruero> {
    const params = { NGruero };
    return this.http.get<Gruero>(this.url, { params });
  }

  public updateGruero(gruero: Gruero): Observable<any>{
    return this.http.put<any>(this.url, gruero);
  }

  public createGruero(gruero: Gruero): Observable<any>{
    return this.http.post<any>(this.url, gruero);
  }

  public deleteGruero(grueroID: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + grueroID);
  }  
}
