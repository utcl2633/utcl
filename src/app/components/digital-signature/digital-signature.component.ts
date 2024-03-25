import { Component, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxDropzoneModule } from "ngx-dropzone";
import { ApiService } from "../../services/api.service";
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: "app-digital-signature",
  standalone: true,
  imports: [NgxDropzoneModule, MatRadioModule, FormsModule],
  templateUrl: "./digital-signature.component.html",
  styleUrl: "./digital-signature.component.css",
})
export class DigitalSignatureComponent {
  files: any;
  fileUrl: any;
  urlSafe: any;
  sanitizer = inject(DomSanitizer);
  apiService = inject(ApiService);
  accept = 'application/pdf';
  signOpt: string = "Signature";
  signaturesOpts: string[] = ['Stamp', 'Signature'];
  onSelect(event: any) {
    console.log(event);
    this.files = event?.addedFiles?.[0];
    let fileToUpload = this.files;
    var formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    if(this.signOpt==='Stamp'){
      this.apiService.uploadPdfWithStamp(formData).then(response => {
        this.processBlob(response);
      });
    }else{
      this.apiService.uploadPdfWithSignature(formData).then(response => {
        this.processBlob(response);
      });
    }
    
    // reader.readAsDataURL(fileToUpload);
  }
  processBlob(response: any) {
    const blob = new Blob([response], { type: 'application/pdf' });
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (event: any) => {
      this.fileUrl = event.target.result;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.fileUrl
      );
    };
  }
  onRemove(event: any) {
    this.files = "";
  }
}
