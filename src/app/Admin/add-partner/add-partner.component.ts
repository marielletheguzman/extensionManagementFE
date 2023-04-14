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

  constructor(private http: HttpClient) {}

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
      .subscribe((response) => console.log(response));
    console.log(formData);
  }
  onLogoSelected(event: any) {
    this.partnerLogo = event.target.files[0];
  }
  onMoaFileSelected(event: any) {
    this.partnerMoaFile = event.target.files[0];
  }
}
