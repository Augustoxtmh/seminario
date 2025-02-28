import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  url = "http://localhost:3000/usuarios"
  
  constructor(private http: HttpClient) { }

  public getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  public updateUsuarios(usuarios: Usuario): Observable<any>{
    return this.http.put<any>(this.url, usuarios.UsuarioId);
  }

  public createUsuarios(usuarios: Usuario): Observable<any>{
    return this.http.post<any>(this.url, usuarios);
  }
}