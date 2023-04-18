import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { LandingService } from 'src/app/landing-page/landing.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditUserPasswordService } from './edit-user-password.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-edit-user-password',
  templateUrl: './edit-user-password.component.html',
  styleUrls: ['./edit-user-password.component.css'],
})
export class EditUserPasswordComponent {
  form!: FormGroup;

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
    private formBuilder: FormBuilder,
    private editProfileServices: EditProfileService,
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router,
    private editPass: EditUserPasswordService
  ) {}
  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });

    this.editProfileServices.getUserInfo().subscribe((data: any) => {
      this.profileDetails = data;
      console.log(this.profileDetails);
    });

    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  passwordsMatch() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  onSubmit() {
    const formData = new FormData();
    const password = this.form.value.password;
    if (password) {
      formData.append('password', password);
    }
    this.editPass.submit(formData).subscribe(
      (response) => {
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'Password Updated',
        });
        timer(1000)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/edit-profile']);
          });
      },
      (error) => {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update',
        });
      }
    );
  }
}
