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
import { ApiService } from "../../services/api.service";

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
  apiService = inject(ApiService);
  strongPasswordRegx = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide: boolean = true;
  data: any = {
    "data": {
      "id": 1,
      "companyMaster": {
        "id": 1,
        "name": "UTCL",
        "address": "ASDF",
        "domain": "@bilra",
        "phone": "9876543210"
      },
      "regions": [
        "Pune"
      ],
      "roleMasters": [
        {
          "id": 1,
          "roleTypes": [],
          "name": "Super",
          "userModel": null
        }
      ],
      "email": "pandagalee@gmail.com",
      "password": null,
      "firstName": "Lakshit",
      "lastName": "Pandagale",
      "phone": "9284244855",
      "agreementId": null,
      "active": false,
      "approved": false
    },
    "message": "Successfully logged in UserModel"
  }
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.strongPasswordRegx),
    ]),
  });
  constructor(private localStorageService: LocalStorageService) {
    this.authService.isLoggedIn().subscribe(value => {
      if (value) {

      }
    })

  }


  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {

    if (this.loginForm.valid) {
      let res = this.data;
      //this.apiService.userLogin(this.loginForm.value).subscribe((res: any) => {
        if (res.message === 'Successfully logged in UserModel') {
          let isLoggedIn = true;
          let userData = res?.data;
          this.localStorageService.setItem('loggedInUser', {userData, isLoggedIn});
          this.authService.login(isLoggedIn);
          this.router.navigate(['/role-type']);
        } else {
          this.router.navigate(['/login']);
        }
     // })

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
