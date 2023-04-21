import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UploadRelatedFilesService } from './upload-related-files.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-programs-upload',
  templateUrl: './list-programs-upload.component.html',
  styleUrls: ['./list-programs-upload.component.css'],
})
export class ListProgramsUploadComponent {
  upload = new FormGroup({
    certificate: new FormControl(undefined),
    attendance: new FormControl(undefined),
    invitation: new FormControl(undefined),
  });
  constructor(
    private uploadServices: UploadRelatedFilesService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    const formData = new FormData();

    if (this.upload.value.certificate) {
      formData.append('certificate', this.upload.value.certificate);
    }
    if (this.upload.value.attendance) {
      formData.append('attendance', this.upload.value.attendance);
    }
    if (this.upload.value.invitation) {
      formData.append('invitation', this.upload.value.invitation);
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.uploadServices.submit(formData, id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  certificateUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.upload.patchValue({
        certificate: file,
      });
    }
  }
  attendanceUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.upload.patchValue({
        attendance: file,
      });
    }
  }
  invitationUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.upload.patchValue({
        invitation: file,
      });
    }
  }
}
