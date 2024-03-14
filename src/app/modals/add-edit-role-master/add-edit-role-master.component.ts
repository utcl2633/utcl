

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
import { NgxSpinnerService } from "ngx-spinner";

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
    roletypeslist:any = [];
  
    ngOnInit() {
      this.getRoleTypeData();
      this.addEditForm = this.formBuilder.group({
        roleTypeId: ["", Validators.required],
        roleName: ["", Validators.required]
      });
  
      if(this.data.element) {
        this.f['roleTypeId'].setValue(this.data?.element?.roleTypeId);
        this.f['roleName'].setValue(this.data?.element?.roleName);
      }
    }
  
    get f() {
      return this.addEditForm.controls;
    }

    getRoleTypeData() {
      this.apiService.getRoleType().subscribe({
        next: (res: any) => {
          this.roletypeslist = res;
          console.log("res get role type dropdown",res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  
    onReset() {
      this.submitted = false;
      this.addEditForm.reset();
    }
  
    onSubmit(form: FormGroup<any>) {
      this.spinner.show();

      console.log('formValue', form.value);
      if(this.data.isAdd) {
        delete form.value.id;
        this.apiService.addRoleMaster(form.value).subscribe({
          next: (res: any) => {
            console.log("success", res);
            this.activeModal.close('Success');
            this.apiService.showSuccessWithTimeout("RoleType added Successfully");
            this.spinner.hide();
          },
          error: (err: any) => {
            this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
            this.spinner.hide();
          }
        })
      } else {
        let payload :any =
          {
            id: this.data.element.id,
            roleTypeId: form.controls['roleTypeId'].value,
            //roleTypeId: 902,
            roleName: form.controls['roleName'].value
          }
        this.apiService.updateRoleMaster(payload).subscribe({
          next: (res: any) => {
            console.log("success", res);
            this.activeModal.close('Success');
          },
          error: (err: any) => {
            console.log("error: Something went wrong!");
          }
        })
      }
    }

  }


