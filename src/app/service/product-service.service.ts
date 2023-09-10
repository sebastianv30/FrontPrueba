import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

const initProduct = {
  id:'',
  name:'',
  quantity:'',
  admissionDate:''
}

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private _product: any[] = [];
  private initProduct$ = new BehaviorSubject<any>(initProduct);
  private appUrl = "http://localhost:8090/mercancias"

  constructor(private http: HttpClient
    ) {
  }

  get product(): any[] {
    return this._product;
  }

  addProduct(product: any[]) {
    this._product = product;
  }

  get selectProduct$(): Observable<any> {
    return this.initProduct$.asObservable()
  }
  setProduct(initProduct:any):void{
    this.initProduct$.next(initProduct)
  }

  public listAllProduct(): Observable<any> {
    return this.http.get<any>(`${this.appUrl}`+ "/all")
  }

  public createProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.appUrl}`+"/save", data)
  }

  public updateProduct(data: any, id: String): Observable<any> {
    console.log(data)
    return this.http.put<any>(`${this.appUrl}` + "/update/" + id, data)
  }


  public deleteProduct(data: any): Observable<any> {
    console.log(data)
    return this.http.delete<any>(`${this.appUrl}` + "/delete/" + data)
  }
}
