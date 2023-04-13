import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { ServicesService } from '../services.service';
import { AuthServiceService } from 'src/app/auth-service.service';
import { UserAuthService } from 'src/app/user-auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  value: string | undefined;
  formGroup!: FormGroup;
  messages!: Message[];

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private messageService: MessageService // Inject MessageService here
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
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
              this.router.navigate(['/list']);
            });
          // this.router.navigate(['/home']);
          console.log('success');
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Failed to Login',
      });
    }
  }
}
