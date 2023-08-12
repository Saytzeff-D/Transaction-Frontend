import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  public api = 'http://localhost:8080/'

  constructor(public http: HttpClient) { }

  addTransaction(payload:any){
    return this.http.post(`${this.api}transact/add`, payload)
  }
  history(){
    return this.http.get(`${this.api}transact/all`)
  }
}
