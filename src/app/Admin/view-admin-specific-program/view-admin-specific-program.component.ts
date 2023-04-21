import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-admin-specific-program',
  templateUrl: './view-admin-specific-program.component.html',
  styleUrls: ['./view-admin-specific-program.component.css'],
})
export class ViewAdminSpecificProgramComponent {
  myForm!: FormGroup;
  users = {
    data: {
      id: 0,
      programTitle: '',
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
    events: [
      {
        eventName: '',
        eventType: '',
      },
    ],
    programMembers: [
      {
        user: '',
        userId: '',
        position: '',
        involvement: '',
      },
    ],
    programparticipant: [
      {
        entity: '',
        participant: '',
        programID: '',
        userId: '',
      },
    ],

    programflow: [
      {
        eventName: '',
        eventType: '',
        program_id: '',
      },
    ],
  };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private message: MessageService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.http
      .get<any>(
        `http://localhost/extensionManagementRestAPI/controllers/admin/show_specific_program.php?id=${id}`
      )
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      });
  }
  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
