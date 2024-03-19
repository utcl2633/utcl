

import { CommonModule } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../services/api.service";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-add-edit-role-master',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './add-edit-role-master.component.html',
  styleUrl: './add-edit-role-master.component.css'
})
export class AddEditRoleMasterComponent {
  activeModal = inject(NgbActiveModal);
  @Input() data!: any;
  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  spinner = inject(NgxSpinnerService);

  addEditForm!: FormGroup;
  submitted = false;
  roletypeslist: any = [];

  ngOnInit() {
    this.getRoleTypeData();
    this.addEditForm = this.formBuilder.group({
      roleTypeId: ["", Validators.required],
      roleName: ["", Validators.required]
    });
    try {
      if (this.data.element) {
        this.f['roleTypeId'].setValue(this.data?.element?.roletype?.['id']);
        this.f['roleName'].setValue(this.data?.element?.roleName);
      }
    } catch (error) {

    }

  }

  get f() {
    return this.addEditForm.controls;
  }

  getRoleTypeData() {
    this.apiService.getRoleType().subscribe({
      next: (res: any) => {
        this.roletypeslist = res;
      },
      error: (err: any) => {

      },
    });
  }

  onReset() {
    this.submitted = false;
    this.addEditForm.reset();
  }

  onSubmit(form: FormGroup<any>) {
    this.addEditForm.markAllAsTouched();
    if (form.valid) {
      this.spinner.show();
      if (this.data.isAdd) {
        delete form.value.id;
        this.apiService.addRoleMaster(form.value).subscribe({
          next: (res: any) => {
            this.activeModal.close('Success');
            this.apiService.showSuccessWithTimeout(res.message);
            this.spinner.hide();
          },
          error: (err: any) => {
            this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
            this.spinner.hide();
            this.activeModal.close('error');
          }
        })
      } else {
        let payload: any =
        {
          id: this.data.element.id,
          roleTypeId: form.controls['roleTypeId'].value,
          //roleTypeId: 902,
          roleName: form.controls['roleName'].value
        }
        this.apiService.updateRoleMaster(payload).subscribe({
          next: (res: any) => {
            this.apiService.showSuccessWithTimeout(res.message);
            this.spinner.hide();
            this.activeModal.close('Success');
          },
          error: (err: any) => {
            this.activeModal.close('error');
          }
        })
      }
    }
  }
}


