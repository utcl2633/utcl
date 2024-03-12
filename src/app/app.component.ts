import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { SideNavService } from './services/side-nav.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, DashboardComponent, SideNavComponent, CommonModule]
})
export class AppComponent {

  sideNavService = inject(SideNavService);
  title = 'utcl';
}
