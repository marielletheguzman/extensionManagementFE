import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  forgot!: FormGroup;
  constructor(
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.forgot = new FormGroup({
      email: new FormControl('', [Validators.required]),
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
  loginProcess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully sent email',
    });
    timer(1000)
      .toPromise()
      .then((done) => {
        this.router.navigate(['']);
      });
  }
  public loading = false;
  resetPass() {
    if (this.forgot.valid) {
      this.loading = true;
      this.http
        .post(
          'http://localhost/extensionManagementRestAPI/emailResetPass/forgotpass/sendAPI.php',
          this.forgot.value
        )

        .subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Email sent successfully',
            });
            this.loading = false;
            timer(1000)
              .toPromise()
              .then((done) => {
                this.router.navigate(['']);
              });
          },
          (error) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Unable to access email',
            });
          }
        );
    }
    // this.loading = false;
  }
}
