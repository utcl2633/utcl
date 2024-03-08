import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: "app-company-master",
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatIconButton, MatSortModule],
  templateUrl: "./company-master.component.html",
  styleUrl: "./company-master.component.css",
})
export class CompanyMasterComponent {

  data: any = [];
  displayColumns: string[] = [
    "name",
    "address1",
    "city",
    "state",
    "zipcode",
    "action"
  ];
  
  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit() {
    this.data = this.getData();
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getData() {
    return [
      {
        name: 'ABC Corp',
        address1: '123 ABC',
        city: 'New York',
        state: 'NY',
        zipcode: '1000'
      },
      {
        name: 'ABC Corp1',
        address1: '123 ABC1',
        city: 'Mumbai',
        state: 'MH',
        zipcode: '1000'
      }
    ]
  }

}
