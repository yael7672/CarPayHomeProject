import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  UpdateValuesOfForm(ValuesOfForm: any,apiRequest:any,header:any) {
    debugger
    // const cleanValuesOfForm = ValuesOfForm.map((obj:any) => ({ type: obj.type, value: obj.value }));
    // const cleanValuesOfFormJson = JSON.stringify(cleanValuesOfForm);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<any>(apiRequest, ValuesOfForm , { headers });

    
  }

  
 GetAllFontFamily() {
    return this.http.get<any>('https://fonts.google.com/metadata/fonts');
  }
}
