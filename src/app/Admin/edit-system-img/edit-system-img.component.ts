import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditSystemService } from '../edit-system/edit-system.service';
import { EditWebsiteServicesService } from '../edit-website/edit-website-services.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-system-img',
  templateUrl: './edit-system-img.component.html',
  styleUrls: ['./edit-system-img.component.css'],
})
export class EditSystemImgComponent {
  profileForm!: FormGroup;

  img = new FormGroup({
    MainImg: new FormControl(''),
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
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.editService.getAdminInfo().subscribe((data: any) => {
      this.systemProfile = data;
    });
  }
  onSubmit() {
    const formData = new FormData();
    if (this.img.value.MainImg) {
      formData.append('MainImg', this.img.value.MainImg);
      console.log('MainImg:', this.img.value.MainImg);
      console.log('formData:', formData);
    }
    this.editWeb.submitImg(formData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logo was successfully updated',
        });
        timer(500)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/admin/edit']);
          });
        // location.reload();
        console.log('success');
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Failed Updating',
        });
      }
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.img.patchValue({
        MainImg: file,
      });
    }
  }
}
