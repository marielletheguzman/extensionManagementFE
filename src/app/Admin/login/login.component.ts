import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

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

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private messageService: MessageService // Inject MessageService here
  ) {}

  ngOnInit() {
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
              this.router.navigate(['/home']);
            });
          // this.router.navigate(['/home']);
          console.log('success');
        }
      });
    } else {
      console.log('Invalid Credentials');
    }
  }
}
