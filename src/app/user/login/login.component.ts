import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router
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
          this.authService.setToken(result.token); // store the token in local storage
          alert(result.message);
          this.router.navigate(['/home']);
          console.log('home');
        } else {
          alert(result.message);
          this.authService.setToken(result.token); // store the token in local storage
          this.router.navigate(['/home']);
          console.log('success');
        }
      });
    } else {
      console.log('Invalid Credentials');
    }
  }
}
