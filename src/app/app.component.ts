import { CommonModule } from '@angular/common';
import { Component, inject,OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { SideNavService } from './services/side-nav.service';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,LoginComponent ,HeaderComponent, DashboardComponent, SideNavComponent, CommonModule]
})
export class AppComponent implements OnInit{

  sideNavService = inject(SideNavService);
  title = 'utcl';
  isloggedIn :any;
  authService = inject(AuthService)
  isDashboard:boolean = false;
  router = inject(Router);

  constructor(){
    this.authService.isLoggedIn().subscribe(value =>{
      this.isloggedIn = value;
     console.log(value,"123455");
    })
   }
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn:any) => {    
      if (loggedIn) {
        this.isDashboard = true;
        this.router.navigate(['/role-type']);
      }
    });
  }

}
