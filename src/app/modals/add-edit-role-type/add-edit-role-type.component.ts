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
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-add-edit-role-type',
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
  templateUrl: './add-edit-role-type.component.html',
  styleUrl: './add-edit-role-type.component.css'
})
export class AddEditRoleTypeComponent {
    activeModal = inject(NgbActiveModal);
    @Input() data!: any;
    formBuilder = inject(FormBuilder);
    apiService = inject(ApiService);
    addEditForm!: FormGroup;
    submitted = false;
    spinner = inject(NgxSpinnerService);
  
    ngOnInit() {
      this.addEditForm = this.formBuilder.group({
        roleTypeName: ["", Validators.required],
        description: [""]
      });
  
      if(this.data.element) {
        this.f['roleTypeName'].setValue(this.data?.element?.roleTypeName);
        this.f['description'].setValue(this.data?.element?.description);
      }
    }
  
    get f() {
      return this.addEditForm.controls;
    }
  
    onReset() {
      this.submitted = false;
      this.addEditForm.reset();
    }
  
    onSubmit(form: FormGroup<any>) {
      this.spinner.show();
      if(this.data.isAdd) {
        delete form.value.id;
        this.apiService.addRoleType(form.value).subscribe({
          next: (res: any) => {
            console.log("success", res.message);
            this.activeModal.close('Success');
            this.apiService.showSuccessWithTimeout("RoleType added Successfully");
            this.spinner.hide();
            if(res.message==="RoleType added Successfully"){
              this.apiService.getRoleType();
            }
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
            roleTypeName: form.controls['roleTypeName'].value,
            description: form.controls['description'].value
          }
        this.apiService.updateRoleType(payload).subscribe({
          next: (res: any) => {
            console.log("success", res.message);
            this.activeModal.close('Success');
            this.apiService.showSuccessWithTimeout("RoleType added Successfully");
            this.spinner.hide();
          },
          error: (err: any) => {
            this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
            this.spinner.hide();
            console.log("error: Something went wrong!");
          }
        })
      }
    }
  }


