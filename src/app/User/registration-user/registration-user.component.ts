import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css'],
})
export class RegistrationUserComponent {
  form = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    position: new FormControl(''),
    password: new FormControl(''),
    profilePicture: new FormControl(undefined),
  });
  messages!: Message[];
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private registrationService: RegistrationService,
    private landingService: LandingService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
  }
  alpha = 0.1;
  alphaDarker = 0.9;
  hex = this.systemProfile.ThemeColor;
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
  onSubmit() {
    const formData = new FormData();
    const fullName = this.form.value.fullName;
    const email = this.form.value.email;
    const position = this.form.value.position;
    const password = this.form.value.password;

    if (fullName) {
      formData.append('fullName', fullName);
    }
    if (email) {
      formData.append('email', email);
    }
    if (position) {
      formData.append('position', position);
    }
    if (password) {
      formData.append('password', password);
    }

    if (this.form.value.profilePicture) {
      formData.append('profilePicture', this.form.value.profilePicture);
    }

    this.registrationService.register(formData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered in Successfully',
        });
        timer(1000)
          .toPromise()
          .then((done) => {
            this.router.navigate(['']);
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        profilePicture: file,
      });
    }
  }
  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
