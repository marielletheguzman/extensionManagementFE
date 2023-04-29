import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };

  token!: string | null;

  forgot!: FormGroup;
  constructor(
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.forgot = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log(this.token);
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
  private loading = false;

  resetPass() {
    if (this.forgot.valid) {
      this.loading = true;
      this.http
        .post(
          `http://localhost/extensionManagementRestAPI/controllers/users/user_reset_pass.php?token=${this.token}`,
          this.forgot.value
        )
        .subscribe(
          (result) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Changed password successfully',
            });
            timer(500)
              .toPromise()
              .then((done) => {
                this.router.navigate(['']);
              });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed changing password',
            });
          }
        );
    }
  }
  passwordsMatch() {
    const password = this.forgot.get('password')?.value;
    const confirmPassword = this.forgot.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
