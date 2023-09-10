import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _personId: string = "";
  private _personname: string = "";
  private appUrl = "http://localhost:8090/usuarios"

  constructor(private http: HttpClient) {
  }

  get personId(): string {
    return this._personId;
  }

  get personName(): string{
    return this._personname;
  }

  addPersonId(id: string) {
    this._personId = id;
  }
  addPersonName(name:string){
    this._personname = name;
  }

  public listAllUser(): Observable<any> {
    return this.http.get<any>(`${this.appUrl}`+ "/all")
  }

  public createUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.appUrl}`, data)
  }
}
