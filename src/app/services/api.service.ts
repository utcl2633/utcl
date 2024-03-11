import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http =  inject(HttpClient);

  getCompanyMaster(): Observable<any> {
    return this.http.get('https://my.api.mockaroo.com/company-master.json?key=5afbf000')
  }

  addCompanyMaster(payload: any): Observable<any> {
    return this.http.post(`https://my.api.mockaroo.com/company-master.json?key=5afbf000&__method=POST`, payload)
  }

  updateCompanyMaster(id: any, payload: any): Observable<any> {
    return this.http.patch(`https://my.api.mockaroo.com/company-master/${id}.json?key=5afbf000&__method=PATCH`, payload)
  }

  deleteCompanyMaster(id: any): Observable<any> {
    return this.http.delete(`https://my.api.mockaroo.com/company-master/${id}.json?key=5afbf000&__method=DELETE`)
  }
}
