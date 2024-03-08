import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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
  ],
  templateUrl: "./user-registration.component.html",
  styleUrl: "./user-registration.component.css",
})
export class UserRegistrationComponent {
  registerForm!: FormGroup;
  submitted = false;
  companyList: string[] = [
    "Extra cheese",
    "Mushroom",
    "Onion",
    "Pepperoni",
    "Sausage",
    "Tomato",
  ];
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

  constructor(private formBuilder: FormBuilder) {}

  companyMasterMock = [
    {
      id: "1",
      name: "ABC",
      domain: "",
      address: "Hyderabad",
      phone: "+91 11111111",
    },
    {
      id: "2",
      name: "XYZ",
      domain: "",
      address: "Mumbai",
      phone: "+91 11111111",
    },
  ];

  regionMock = [
    {
      id: "1",
      regionName: "United State of America",
    },
    {
      id: "2",
      regionName: "INDIA",
    },
    {
      id: "3",
      regionName: "JAPAN",
    },
  ];

  roleType = [
    {
      id: "1",
      rollTypeName: "A",
      description: "This is role A",
    },
    {
      id: "2",
      rollTypeName: "B",
      description: "This is role B",
    },
    {
      id: "3",
      rollTypeName: "C",
      description: "This is role C",
    },
  ];

  RoleMaster = [
    {
      id: "1",
      rollType: {
        id: "11",
        rollTypeName: "A",
        description: "This is role A",
      },
      rollName: "Test1",
    },
    {
      id: "2",
      rollType: {
        id: "12",
        rollTypeName: "B",
        description: "This is role B",
      },
      rollName: "Test2",
    },
  ];

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      company: ["", Validators.required],
      region: ["", Validators.required],
      role: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phNumber: ["", Validators.required],
      file: [""],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(form: any) {
    this.registerForm.markAllAsTouched();
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
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
  }
}
