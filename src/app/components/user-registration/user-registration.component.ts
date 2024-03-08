import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MatCardModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  registerForm!: FormGroup;
  submitted = false;
  companyList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        company: ['', Validators.required],
        region: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phNumber: ['', Validators.required]
      },
  
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(form: any) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
