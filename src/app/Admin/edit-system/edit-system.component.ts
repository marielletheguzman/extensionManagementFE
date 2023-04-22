import { Component } from '@angular/core';
import { EditSystemService } from './edit-system.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-system',
  templateUrl: './edit-system.component.html',
  styleUrls: ['./edit-system.component.css'],
})
export class EditSystemComponent {
  profileForm!: FormGroup;
  color!: string;
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };

  changeTheme = new FormGroup({
    WebsiteName: new FormControl(''),
    ThemeColor: new FormControl(''),
    Description: new FormControl(''),
  });

  MainImg = this.systemProfile.MainImg;
  constructor(
    private editService: EditSystemService,
    private router: Router,
    private messageService: MessageService, // Inject MessageService here
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      WebsiteName: '',
      ThemeColor: '',
      Description: '',
    });
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

  onSubmit() {
    const formData = new FormData();
    const WebsiteName = this.profileForm.value.WebsiteName;
    const ThemeColor = this.profileForm.value.ThemeColor;
    const Description = this.profileForm.value.Description;
    console.log('submit');
    if (WebsiteName) {
      formData.append('WebsiteName', WebsiteName);
      console.log(WebsiteName);
    }
    if (ThemeColor) {
      formData.append('ThemeColor', ThemeColor);
    }
    if (Description) {
      formData.append('Description', Description);
    }
    this.editService.submit(formData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfully',
        });
        timer(1000)
          .toPromise()
          .then((done) => {
            window.location.reload();
          });
        console.log('submit');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
