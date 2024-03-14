import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
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
import { DomSanitizer } from "@angular/platform-browser";
import { ToastModule } from "primeng/toast";
import { catchError, forkJoin, of } from "rxjs";
import { ApiService } from "../../services/api.service";

export interface RoleMaster {
  id: number;
  name: string;
}
export interface Region {
  id: number;
  regionName: string;
}
export interface CompanyMaster {
  id: number;
  name: string;
  address: string;
  domain: string;
  phone: string;
}

@Component({
  selector: "app-user-registration",
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
  ],
  templateUrl: "./user-registration.component.html",
  styleUrl: "./user-registration.component.css"
})
export class UserRegistrationComponent {
  registerForm!: FormGroup;
  submitted = false;
  allowedFileExtensions = [
    "pdf",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "doc",
    "docx",
    "txt",
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {}

  companyMasterList!: CompanyMaster[];
  regionList!: Region[];
  roleMasterList!: RoleMaster[];
  fileUrl: any;
  urlSafe: any;
  isOpenPrev = false;
  sanitizer = inject(DomSanitizer);
  apiService = inject(ApiService);

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      company: ["", Validators.required],
      region: ["", Validators.required],
      role: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phNumber: ["", Validators.required],
      file: [""],
    });
    let requests = [
      this.apiService
        .getListOfData("http://localhost:8080/getRegions")
        .pipe(catchError((err) => of([]))),
      this.apiService
        .getListOfData("http://localhost:8080/getAllRoleMasters")
        .pipe(catchError((err) => of([]))),
      this.apiService
        .getListOfData("http://localhost:8080/getAllCompanyMasters")
        .pipe(catchError((err) => of([]))),
    ];
    forkJoin(requests).subscribe((res: any) => {
      if (res) {
        this.regionList = res[0];
        this.roleMasterList = res[1];
        this.companyMasterList = res[2];
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(form: any) {
    console.log(form.value);
    this.registerForm.markAllAsTouched();
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      let formData = form.value;
      let payload = {
        companyMasterId: formData?.company,
        regions: formData?.region,
        roleMasterIds: formData?.role,
        email: formData?.email,
        password: formData?.password,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        phone: formData?.phNumber,
        agreementId: 0,
      };
      this.apiService.userRegistration(payload).subscribe((res) => {
        this.apiService.showSuccessWithTimeout('Registered Successfully');
        this.registerForm.reset();
      }, (error) => {
        this.apiService.showErrorWithTimeout('Something went wrong! Please try again');
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.isOpenPrev = false;
    this.registerForm.reset();
  }

  handleFileInput(target: any) {
    this.registerForm.value.file = target.files.item(0);
    const ext = this.registerForm.value.file.name.substring(
      this.registerForm.value.file.name.lastIndexOf(".") + 1
    );
    if (this.registerForm?.value?.file?.size > 2000000) {
      this.registerForm.controls["file"].setErrors({ invalidSize: true });
    } else if (!this.allowedFileExtensions.includes(ext.toLowerCase())) {
      this.registerForm.controls["file"].setErrors({ extensionFile: true });
    }

    // file upload & priview
    if (this.registerForm.controls["file"].valid) {
      this.isOpenPrev = true;
      let fileToUpload = target.files.item(0);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.fileUrl
        );
      };
      reader.readAsDataURL(fileToUpload);
    } else {
      this.isOpenPrev = false;
    }
  }
}
