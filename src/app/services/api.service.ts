import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private http = inject(HttpClient);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  showSuccessWithTimeout(message: any) {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  }

  showErrorWithTimeout(message: any) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Record deleted",
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
        });
      },
    });
  }

  userRegistration(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addUser`, payload);
  }

  getCompanyMaster(): Observable<any> {
    return this.http.get("http://localhost:8080/getAllCompanyMasters");
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
    return this.http.delete(`http://localhost:8080/deleteCompanyMaster` + id);
  }

  getRoleType(): Observable<any> {
    return this.http.get("http://localhost:8080/getAllRoleType");
  }

  addRoleType(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addRoleType`, payload);
  }

  updateRoleType(payload: any): Observable<any> {
    return this.http.put(`http://localhost:8080/updateRoleType`, payload);
  }

  deleteRoleType(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteRoleType/${id}`);
  }

  getRoleMaster(): Observable<any> {
    return this.http.get("http://localhost:8080/getAllRoleMaster");
  }

  addRoleMaster(payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/addRoles`, payload);
  }

  updateRoleMaster(payload: any): Observable<any> {
    return this.http.put(`http://localhost:8080/updateRoleMaster`, payload);
  }

  deleteRoleMaster(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteRole/${id}`);
  }
}
