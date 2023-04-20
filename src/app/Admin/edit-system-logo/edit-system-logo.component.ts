import { Component } from '@angular/core';
import { EditSystemService } from '../edit-system/edit-system.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditWebsiteServicesService } from '../edit-website/edit-website-services.service';

@Component({
  selector: 'app-edit-system-logo',
  templateUrl: './edit-system-logo.component.html',
  styleUrls: ['./edit-system-logo.component.css'],
})
export class EditSystemLogoComponent {
  profileForm!: FormGroup;
  logo = new FormGroup({
    Logo: new FormControl(''),
  });
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private editService: EditSystemService,
    private editWeb: EditWebsiteServicesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editService.getAdminInfo().subscribe((data: any) => {
      this.systemProfile = data;
    });
  }
  onSubmit() {
    const formData = new FormData();
    if (this.logo.value.Logo) {
      formData.append('Logo', this.logo.value.Logo);
      console.log('Logo:', this.logo.value.Logo);
      console.log('formData:', formData);
    }
    this.editWeb.submitLogo(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logo.patchValue({
        Logo: file,
      });
    }
  }
}