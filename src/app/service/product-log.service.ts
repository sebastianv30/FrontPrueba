import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductLogService {
  private appUrl = "http://localhost:8090/logs"

  constructor(private http: HttpClient) {
  }

  public createLog(data: any): Observable<any> {
    return this.http.post<any>(`${this.appUrl}`+"/savelog", data)
  }
  
}
