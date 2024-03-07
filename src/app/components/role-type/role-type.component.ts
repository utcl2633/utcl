import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-type',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule, MatInputModule, MatSelectModule,CommonModule],
  templateUrl: './role-type.component.html',
  styleUrl: './role-type.component.css'
})
export class RoleTypeComponent {
  registerForm:FormGroup;
  constructor(fb: FormBuilder)
  {
  this.registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
}


}
