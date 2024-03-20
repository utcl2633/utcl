import { Component, inject } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NgxDropzoneModule } from "ngx-dropzone";

@Component({
  selector: "app-digital-signature",
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: "./digital-signature.component.html",
  styleUrl: "./digital-signature.component.css",
})
export class DigitalSignatureComponent {
  files: any;
  fileUrl: any;
  urlSafe: any;
  sanitizer = inject(DomSanitizer);

  onSelect(event: any) {
    console.log(event);
    this.files = event?.addedFiles?.[0];
    let fileToUpload = this.files;
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.fileUrl
        );
      };
      reader.readAsDataURL(fileToUpload);
  }

  onRemove(event: any) {
    this.files = "";
  }
}
