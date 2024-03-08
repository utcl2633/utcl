import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, DashboardComponent, SideNavComponent, FooterComponent]
})
export class AppComponent {
  title = 'utcl';
}
