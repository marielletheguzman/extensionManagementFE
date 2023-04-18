import { Component } from '@angular/core';
import { EditSystemService } from '../edit-system/edit-system.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-system-logo',
  templateUrl: './edit-system-logo.component.html',
  styleUrls: ['./edit-system-logo.component.css'],
})
export class EditSystemLogoComponent {
  profileForm!: FormGroup;
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private editService: EditSystemService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editService.getAdminInfo().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);

      this.profileForm.setValue({
        WebsiteName: this.systemProfile.WebsiteName,
        Description: this.systemProfile.Description,
        ThemeColor: this.systemProfile.ThemeColor,
      });
    });
  }
}
