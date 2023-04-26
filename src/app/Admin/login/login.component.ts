import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
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
    private landingService: LandingService,
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService // Inject MessageService here
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe((result) => {
        if (result.success) {
          console.log(result);
          this.authService.setToken(result.token);
          alert(result.message);
          // this.router.navigate(['/home']);
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
              this.router.navigate(['/admin/dashboard']);
            });
          // this.router.navigate(['/home']);
          console.log('success');
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Failed Logging in',
      });
    }
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
}
