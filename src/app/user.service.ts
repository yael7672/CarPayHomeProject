import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  UpdateValuesOfForm(ValuesOfForm: any,apiRequest:any,header:any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(apiRequest, ValuesOfForm , { headers });
  }
}
