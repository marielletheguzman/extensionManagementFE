import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-program-members',
  templateUrl: './list-program-members.component.html',
  styleUrls: ['./list-program-members.component.css'],
})
export class ListProgramMembersComponent {
  myForm!: FormGroup;
  users = {
    partners: [
      {
        userId: 0,
        name: '',
        position: '',
      },
    ],
  };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_latest_programmember.php'
      )
      .subscribe((data) => {
        if (data && data['partners']) {
          this.users.partners = data.partners;
          console.log(data.partners);
        }
      });
  }
}
