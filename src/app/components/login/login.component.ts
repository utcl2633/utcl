import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, RouterModule } from "@angular/router";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    MatCardModule, CommonModule,
    MatButtonModule, MatFormFieldModule,
    MatLabel, MatInputModule, MatButtonModule,
    RouterOutlet, RouterLink, RouterLinkActive, RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  strongPasswordRegx = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  hide: boolean = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,
    Validators.pattern(this.strongPasswordRegx)])
    
  })
    
    constructor(private router:Router ){}
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
   
    if (this.loginForm.valid ) {
      alert('Form Submitted succesfully!!!');
      console.table(this.loginForm.value);
      this.router.navigateByUrl('/company-master')
      }
    this.loginForm.reset();
  }


  

}
