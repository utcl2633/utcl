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
import { AddEditRoleMasterComponent } from "../../modals/add-edit-role-master/add-edit-role-master.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: 'app-role-master',
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
    NgxSpinnerModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './role-master.component.html',
  styleUrl: './role-master.component.css'
})

export class RoleMasterComponent {
    data: any = [];
    displayColumns: string[] = ["roleType", "roleName", "action"];
    selectedValue!: string;
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
      //this.getRoleTypesData();
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
      this.apiService.getRoleMaster().subscribe({
        next: (res: any) => {
          console.log("role master get res",res);
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.spinner.hide();
        },
        error: (err: any) => {
          console.log(err);
          this.spinner.hide();
        },
      });
    }

    addEditRoleMaster(element?: any, addOrEdit: boolean = true) {
      const modalRef = this.modalService.open(AddEditRoleMasterComponent);
      modalRef.componentInstance.data = {
        header: addOrEdit ? "Add Role Master" : "Update Role Master",
        isAdd: addOrEdit,
        element: element,
      };
    }
  
    deleteRoleMaster(event:any,id: any) {
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
          this.apiService.deleteRoleMaster(id).subscribe((res) => {
            this.apiService.showSuccessWithTimeout('Deleted Successfully');
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