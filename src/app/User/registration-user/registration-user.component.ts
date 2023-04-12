import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

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

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

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
}
