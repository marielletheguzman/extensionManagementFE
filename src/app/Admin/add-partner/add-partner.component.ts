import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddPartnerServicesService } from './add-partner-services.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css'],
})
export class AddPartnerComponent {
  partnerName!: string;
  partnerAddress!: string;
  partnerContactPerson!: string;
  partnerContactNumber!: string;
  partnerStartDate!: string;
  partnerEndDate!: string;
  partnerLogo!: File;
  partnerMoaFile!: File;

  constructor(
    private message: MessageService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit() {
    const formData = new FormData();
    formData.append('partnerName', this.partnerName);
    formData.append('partnerAddress', this.partnerAddress);
    formData.append('partnerContactPerson', this.partnerContactPerson);
    formData.append('partnerContactNumber', this.partnerContactNumber);
    formData.append('partnerStartDate', this.partnerStartDate);
    formData.append('partnerEndDate', this.partnerEndDate);
    formData.append('partnerLogo', this.partnerLogo);
    formData.append('partnerMoaFile', this.partnerMoaFile);

    this.http
      .post(
        'http://localhost/extensionManagementRestAPI/controllers/admin/create_ext_partner.php',
        formData
      )
      .subscribe(
        (response) => {
          this.message.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User added to program',
          });
          timer(800)
            .toPromise()
            .then((done) => {
              this.router.navigate(['/admin/ongoing_partners']);
            });
        },
        (error) => {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add user to program',
          });
        }
      );
    console.log(formData);
  }
  onLogoSelected(event: any) {
    this.partnerLogo = event.target.files[0];
  }
  onMoaFileSelected(event: any) {
    this.partnerMoaFile = event.target.files[0];
  }
}
