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

  
  getRoleType(): Observable<any> {
    return this.http.get('https://api.mockaroo.com/api/d0399790?count=1000&key=5afbf000')
  }

  addRoleType(payload: any): Observable<any> {
    return this.http.post(`https://my.api.mockaroo.com/role-type.json?key=5afbf000&__method=POST`, payload)
  }

  updateRoleType(id: any, payload: any): Observable<any> {
    return this.http.patch(`https://my.api.mockaroo.com/role-type/${id}.json?key=5afbf000&__method=PATCH`, payload)
  }

  deleteRoleType(id: any): Observable<any> {
    return this.http.delete(`https://my.api.mockaroo.com/role-type/${id}.json?key=5afbf000&__method=DELETE`)
  }

  getRoleMaster(): Observable<any> {
    return this.http.get('https://my.api.mockaroo.com/role-master.json?key=5afbf000')
  }

  addRoleMaster(payload: any): Observable<any> {
    return this.http.post(`https://my.api.mockaroo.com/role-master.json?key=5afbf000&__method=POST`, payload)
  }

  updateRoleMaster(id: any, payload: any): Observable<any> {
    return this.http.patch(`https://my.api.mockaroo.com/role-master/${id}.json?key=5afbf000&__method=PATCH`, payload)
  }

  deleteRoleMaster(id: any): Observable<any> {
    return this.http.delete(`https://my.api.mockaroo.com/role-master/${id}.json?key=5afbf000&__method=DELETE`)
  }

  getRoletypes(): Observable<any> {
    return this.http.get('https://my.api.mockaroo.com/role-types.json?key=5afbf000')
  }

}
