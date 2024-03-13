import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http =  inject(HttpClient);

  userRegistration(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addUser`, payload);
  }

  getCompanyMaster(): Observable<any> {
    return this.http.get('http://localhost:8080/getAllCompanyMasters');
  }

  getListOfData(url: string): Observable<any> {
    return this.http.get(url);
  }

  addCompanyMaster(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addCompanyMaster`, payload);
  }

  updateCompanyMaster(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/updateCompanyMaster`, payload);
  }

  deleteCompanyMaster(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteCompanyMaster`+id);
  }

  
  getRoleType(): Observable<any> {
    return this.http.get('http://localhost:8080/getAllRoleType')
  }

  addRoleType(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addRoleType`, payload)
  }

  updateRoleType(payload: any): Observable<any> {
    return this.http.put(`http://localhost:8080/updateRoleType`, payload)
  }

  deleteRoleType(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteRoleType/${id}`)
  }

  getRoleMaster(): Observable<any> {
    return this.http.get('http://localhost:8080/getAllRoleMaster')
  }

  addRoleMaster(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addRoles`, payload)
  }

  updateRoleMaster(payload: any): Observable<any> {
    return this.http.put(`http://localhost:8080/updateRoleMaster`, payload)
  }

  deleteRoleMaster(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteRole/${id}`)
  }

}
