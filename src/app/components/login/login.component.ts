import { LiveAnnouncer } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  router = inject(Router);
  _liveAnnouncer = inject(LiveAnnouncer);
  authService = inject(AuthService);
  strongPasswordRegx = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide: boolean = true;
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.strongPasswordRegx),
    ]),
  });
constructor(private localStorageService: LocalStorageService){
 this.authService.isLoggedIn().subscribe(value =>{
  if(value){

  }
 })

}

  
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {   

  if (this.loginForm.valid) {
    alert("Form Submitted succesfully!!!");
   let email = this.loginForm.controls['email'].value;
   let password = this.loginForm.controls['password'].value;

    this.authService.login(email, password).subscribe((loggedIn:any) => {
      if (loggedIn) {  
        this.localStorageService.setItem('loggedInUser', { email, password, isLoggedIn: true });     
        this.router.navigate(['/role-type']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}
