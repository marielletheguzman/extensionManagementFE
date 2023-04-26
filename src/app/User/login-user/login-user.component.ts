import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ServicesService } from '../services.service';
import { AuthServiceService } from 'src/app/auth-service.service';
import { UserAuthService } from 'src/app/user-auth.service';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  value: string | undefined;
  formGroup!: FormGroup;
  messages!: Message[];
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private authService: UserAuthService,
    private landingService: LandingService,
    private router: Router,
    private messageService: MessageService // Inject MessageService here
  ) {}

  ngOnInit() {
    this.initForm();
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
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        (result) => {
          if (result.success) {
            console.log(result);
            this.authService.setToken(result.token);
            alert(result.message);
            console.log('home');
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Logged in Successfully',
            });
            timer(1000)
              .toPromise()
              .then((done) => {
                this.authService.setToken(result.token);
                this.router.navigate(['/list']);
              });
            console.log('success');
          }
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'warn',
            summary: 'Login Unsuccessful',
            detail: error.error.message,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Failed to Login',
      });
    }
  }
}
