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
import { Message } from 'primeng/api';
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
  notValid!: Message[];
  minValue!: Message[];
  constructor(
    private formBuilder: FormBuilder,
    private editProfileServices: EditProfileService,
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router,
    private editPass: EditUserPasswordService
  ) {}
  ngOnInit() {
    this.notValid = [
      { severity: 'error', summary: 'Invalid', detail: 'Password not Match' },
    ];
    this.minValue = [
      { severity: 'error', summary: 'Invalid', detail: 'Minimum Value of 7' },
    ];
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });

    this.editProfileServices.getUserInfo().subscribe((data: any) => {
      this.profileDetails = data;
      console.log(this.profileDetails);
    });

    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  passwordsMatch() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  checkMinValue() {
    const value = this.form.get('password')?.value;
    if (value < 7) {
      return false;
    }
    return true;
  }

  onSubmit() {
    const formData = new FormData();
    const password = this.form.value.password;
    const password1 = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    if (password1 !== confirmPassword) {
      this.messageService.add({
        key: 'bc',
        severity: 'error',
        summary: 'Failed',
        detail: 'Password not match',
      });
    } else {
      if (password.length >= 7) {
        console.log('greater than');
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
      } else {
        console.log('less than');
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Failed',
          detail: 'Password must be at least 7 characters long',
        });
      }
    }
  }
  alpha = 0.1;
  hexToRgbA(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
}
