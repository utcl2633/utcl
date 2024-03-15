import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { Component, ViewChild, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ApiService } from "../../services/api.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { AddEditRoleTypeComponent } from "../../modals/add-edit-role-type/add-edit-role-type.component";
import { ToastModule } from "primeng/toast";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-role-type',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatIconButton,
    MatSortModule,
    HttpClientModule,
    NgbModalModule,
    ToastModule,
    NgxSpinnerModule,
    ConfirmDialogModule
  ],
  templateUrl: './role-type.component.html',
  styleUrl: './role-type.component.css'
})

export class RoleTypeComponent {
    data: any = [];
    displayColumns: string[] = ["roleTypeName", "description", "action"];
    http = inject(HttpClient);
    apiService = inject(ApiService);
    _liveAnnouncer = inject(LiveAnnouncer);
    modalService = inject(NgbModal);
    spinner = inject(NgxSpinnerService);
    confirmationService = inject(ConfirmationService);

  
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngOnInit() {
      this.getData();
    }
  
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }
  
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce("Sorting cleared");
      }
    }
  
    getData() {
      this.spinner.show();
      this.apiService.getRoleType().subscribe({
        next: (res: any) => {
          this.spinner.hide();
          console.log("res get role type",res);
           this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();

        },
      });
    }
  
    addEditRoleType(element?: any, addOrEdit: boolean = true) {
      const modalRef = this.modalService.open(AddEditRoleTypeComponent);
      modalRef.componentInstance.data = {
        header: addOrEdit ? "Add Role Type" : "Update Role Type",
        isAdd: addOrEdit,
        element: element,
      };
      modalRef.result.then((result) => {
        console.log(result);
        this.getData();
      });
    }
  
    deleteRoleType(event:any,id: any) {
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
          this.spinner.show();
          this.apiService.deleteRoleType(id).subscribe((res) => {
            this.apiService.showSuccessWithTimeout(res.message);
            this.spinner.hide();
          }, (error) => {
            this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
            this.spinner.hide();
          });
        },
        reject: () => {
        },
      });    
    }
  }