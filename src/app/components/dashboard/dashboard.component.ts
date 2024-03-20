import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [HeaderComponent, MatButtonModule, MatMenuModule,MatIconModule,RouterLink],
})
export class DashboardComponent {

}
