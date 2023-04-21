import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-of-programs',
  templateUrl: './list-of-programs.component.html',
  styleUrls: ['./list-of-programs.component.css'],
})
export class ListOfProgramsComponent {
  myForm!: FormGroup;
  users = {
    programs: [
      {
        id: 0,
        programTitle: 0,
        programLead: '',
        place: '',
        additionalDetails: '',
        partner: '',
        startDate: '',
        endDate: '',
        certificate: '',
        attendance: '',
        invitation: '',
      },
    ],
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_all_programs.php'
      )
      .subscribe((data) => {
        if (data && data['programs']) {
          this.users.programs = data.programs;
          console.log(data);
        }
      });
  }
  onView(id: string) {
    this.router.navigate(['admin/view-programs/', id]);
  }
  onUpload(id: string) {
    this.router.navigate(['admin/upload-file/', id]);
  }
}
