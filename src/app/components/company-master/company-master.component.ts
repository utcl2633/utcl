import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, ViewChild, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { NgbModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { AddEditCompanyMasterComponent } from "../../modals/add-edit-company-master/add-edit-company-master.component";
import { ApiService } from "../../services/api.service";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-company-master",
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
  templateUrl: "./company-master.component.html",
  styleUrl: "./company-master.component.css",
})
export class CompanyMasterComponent {
  data: any = [];
  displayColumns: string[] = [
    "companyName",
    "domain",
    "address",
    "phone",
    "action",
  ];
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
    this.dataSource.data = [
      {
        name: "dsds",
        domain: "edsasad",
        address: "sds",
        phone: "1232132",
      },
    ];
    this.dataSource.paginator = this.paginator;
    this.spinner.show();
    this.apiService.getCompanyMaster().subscribe({
      next: (res: any) => {
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

  addEditCompanyMaster(element?: any, addOrEdit: boolean = true) {
    const modalRef = this.modalService.open(AddEditCompanyMasterComponent);
    modalRef.componentInstance.data = {
      header: addOrEdit ? "Add Company Master" : "Update Company Master",
      isAdd: addOrEdit,
      element: element,
    };
    modalRef.result.then((result) => {
      console.log(result);
      this.getData();
    });
  }

  deleteCompanyMaster(event: any, id: any) {
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
        this.apiService.deleteCompanyMaster(id).subscribe((res) => {
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
