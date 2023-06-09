import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

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
        id: 0,
        userId: 0,
        name: '',
        position: '',
        involvement: '',
      },
    ],
  };
  usersp = {
    participants: [
      {
        id: 0,
        program_id: '',
        participant: '',
        entity: '',
      },
    ],
  };
  userFlow = {
    flow: [
      {
        id: 0,
        selectedId: 0,
        eventName: '',
        eventType: '',
      },
    ],
  };
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private landingService: LandingService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitBtn() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfuly Added!',
    });
    timer(500)
      .toPromise()
      .then((done) => {
        this.router.navigate(['/admin/list-programs']);
      });
  }
  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_latest_programmember.php'
      )
      .subscribe((data) => {
        if (data && data['partners']) {
          this.users.partners = data.partners;
          // console.log(data.partners);
        }
      });

    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_latest_participant.php'
      )
      .subscribe((data) => {
        if (data && data['participants']) {
          this.usersp.participants = data.participants;
          // console.log(data.participants);
        }
      });
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_latest_flow.php'
      )
      .subscribe((data) => {
        if (data && data['flow']) {
          this.userFlow.flow = data.flow;
          console.log(data.flow);
        }
      });
  }

  removeMember(id: number) {
    this.http
      .post(
        'http://localhost/extensionManagementRestAPI/controllers/admin/delete_specific_program_members.php?id=' +
          id,
        {}
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Removed',
            detail: 'Successfully removed participant',
          });
          // Remove the member from the local array
          this.users.partners = this.users.partners.filter((m) => m.id !== id);
        },
        (err) => {
          console.error('Error deleting member:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to removed participant',
          });
        }
      );
  }
  removeParticipant(id: number) {
    this.http
      .post(
        'http://localhost/extensionManagementRestAPI/controllers/admin/delete_specific_prog_part.php?id=' +
          id,
        {}
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Removed',
            detail: 'Successfully removed participant',
          });
          // Remove the member from the local array
          this.usersp.participants = this.usersp.participants.filter(
            (m) => m.id !== id
          );
        },
        (err) => {
          console.error('Error deleting member:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to removed participant',
          });
        }
      );
  }
  removeFlow(id: number) {
    this.http
      .post(
        'http://localhost/extensionManagementRestAPI/controllers/admin/delete_specific_program_flow.php?id=' +
          id,
        {}
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Removed',
            detail: 'Successfully removed participant',
          });
          // Remove the member from the local array
          this.userFlow.flow = this.userFlow.flow.filter((m) => m.id !== id);
        },
        (err) => {
          console.error('Error deleting member:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to removed participant',
          });
        }
      );
  }
}
