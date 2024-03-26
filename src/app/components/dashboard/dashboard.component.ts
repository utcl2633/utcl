import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [HeaderComponent, MatButtonModule, MatMenuModule,MatIconModule,RouterLink],
})
export class DashboardComponent {
  router = inject(Router);

    constructor(private localStorageService: LocalStorageService) {
    }
    logout() {    
        this.localStorageService.removeItem('loggedInUser');
        this.router.navigate(['/login']);
        
      }
}
