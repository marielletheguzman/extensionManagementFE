import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminEditProfileService } from './admin-edit-profile.service';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.css'],
})
export class AdminEditProfileComponent implements OnInit {
  id!: string;
  profileForm!: FormGroup;
  profileDetails = {
    fullName: '',
    email: '',
    position: '',
    profilePicture: '',
  };
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private landingService: LandingService,
    private formBuilder: FormBuilder,
    private editUser: AdminEditProfileService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });

    this.profileForm = this.formBuilder.group({
      fullName: '',
      email: '',
      position: '',
    });
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.editUser.getUserInfo(this.id).subscribe((data: any) => {
        this.profileDetails = data;
        this.profileForm.setValue({
          fullName: this.profileDetails.fullName,
          email: this.profileDetails.email,
          position: this.profileDetails.position,
        });
      });
    });
  }
  onSubmit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.editUser.submit(this.id, this.profileForm.value).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully Updated',
        });
        timer(1000)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/admin/manage_users']);
          });
        console.log('Success');
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to Update the User',
        });
      }
    );
  }
}
