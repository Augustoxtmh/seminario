import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://localhost:3000/pedidosgrua/upload'; // Asegúrate de cambiar esto si usas otro puerto

  constructor(private http: HttpClient) {}

  uploadFile(file: File, idPedido: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(idPedido)
    return this.http.post(`${this.apiUrl}/${idPedido}`, formData);
  }
}