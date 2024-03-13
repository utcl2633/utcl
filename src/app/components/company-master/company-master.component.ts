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
import { AddEditCompanyMasterComponent } from "../../modals/add-edit-company-master/add-edit-company-master.component";

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
  ],
  templateUrl: "./company-master.component.html",
  styleUrl: "./company-master.component.css",
})
export class CompanyMasterComponent {
  data: any = [];
  displayColumns: string[] = ["companyName", "domain", "address", "phone", "action"];
  http = inject(HttpClient);
  apiService = inject(ApiService);
  _liveAnnouncer = inject(LiveAnnouncer);
  modalService = inject(NgbModal);

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
    this.apiService.getCompanyMaster().subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
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
  }

  deleteCompanyMaster(id: any) {
    this.apiService.deleteCompanyMaster(id).subscribe((res) => {
      
    })
  }
}
