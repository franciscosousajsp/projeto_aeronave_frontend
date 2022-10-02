import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aeronave } from '../model/aeronave';

@Injectable({
  providedIn: 'root'
})
export class AeronaveService {

  baseUrl: string = environment.baseurl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findall(): Observable<Aeronave[]>{
    const url = `${this.baseUrl}/aeronaves`
    return this.http.get<Aeronave[]>(url)
  }

  findById(id: string): Observable<Aeronave>{
    const url = `${this.baseUrl}/aeronaves/${id}`
    return this.http.get<Aeronave>(url)
  }

  create(aeronave: Aeronave):Observable<Aeronave>{
    const url = `${this.baseUrl}/aeronaves`
    return this.http.post<Aeronave>(url, aeronave)

  }

  delete(id: string): Observable<Aeronave>{
    const url = `${this.baseUrl}/aeronaves/${id}`
    return this.http.delete<Aeronave>(url)
  }

  update(aeronave: Aeronave): Observable<void>{
    const url = `${this.baseUrl}/aeronaves/${aeronave.id}`
    return this.http.put<void>(url, aeronave)
  }
  
  message(msg : string):void{
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition:'top',
      duration:3000
    })
  }

}
