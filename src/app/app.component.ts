import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideNavService } from './services/side-nav.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, DashboardComponent, SideNavComponent, FooterComponent, CommonModule]
})
export class AppComponent {

  sideNavService = inject(SideNavService);
  title = 'utcl';
}
