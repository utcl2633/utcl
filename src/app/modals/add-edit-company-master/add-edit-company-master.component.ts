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

@Component({
  selector: "app-add-edit-company-master",
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
    ToastModule,
    NgxSpinnerModule
  ],
  templateUrl: "./add-edit-company-master.component.html",
  styleUrl: "./add-edit-company-master.component.css",
})
export class AddEditCompanyMasterComponent {
  activeModal = inject(NgbActiveModal);
  @Input() data!: any;
  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);
  addEditForm!: FormGroup;
  submitted = false;
  spinner = inject(NgxSpinnerService);

  ngOnInit() {
    this.addEditForm = this.formBuilder.group({
      companyName: ["", Validators.required],
      domain: [
        "",
        [Validators.required, Validators.pattern("^[@](/?[A-Za-z])*/?$")],
      ],
      address: ["", Validators.required],
      phNumber: ["", Validators.required],
    });

    if (this.data.element) {
      this.f["companyName"].setValue(this.data?.element?.name);
      this.f["domain"].setValue(this.data?.element?.domain);
      this.f["address"].setValue(this.data?.element?.address);
      this.f["phNumber"].setValue(this.data?.element?.phone);
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
    if (form.valid) {
      this.spinner.show();
      let payload: any = {
        name: form?.value?.companyName,
        domain: form?.value?.domain,
        address: form?.value?.address,
        phone: form?.value?.phNumber,
      };
      if (this.data.isAdd) {
        this.apiService.addCompanyMaster(payload).subscribe({
          next: (res: any) => {
            this.activeModal.close("Success");
            this.apiService.showSuccessWithTimeout("Company added successfully");
            this.spinner.hide();
          },
          error: (err: any) => {
            this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
            this.spinner.hide();
          },
        });
      } else {
        payload["id"] = this.data.element.id;
        this.apiService.updateCompanyMaster(payload).subscribe({
          next: (res: any) => {
            this.activeModal.close("Success");
            this.apiService.showSuccessWithTimeout("Company updated successfully");
            this.spinner.hide();
          },
          error: (err: any) => {
            this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
            this.spinner.hide();
          },
        });
      }
    }
  }
}
