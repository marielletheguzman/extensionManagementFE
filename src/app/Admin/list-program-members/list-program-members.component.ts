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
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
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
            summary: 'Deleted',
            detail: 'Successfully Removed',
          });
          // Remove the member from the local array
          this.users.partners = this.users.partners.filter((m) => m.id !== id);
        },
        (err) => {
          console.error('Error deleting member:', err);
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
            summary: 'Deleted',
            detail: 'Successfully Removed',
          });
          // Remove the member from the local array
          this.usersp.participants = this.usersp.participants.filter(
            (m) => m.id !== id
          );
        },
        (err) => {
          console.error('Error deleting member:', err);
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
            summary: 'Deleted',
            detail: 'Successfully Removed',
          });
          // Remove the member from the local array
          this.userFlow.flow = this.userFlow.flow.filter((m) => m.id !== id);
        },
        (err) => {
          console.error('Error deleting member:', err);
        }
      );
  }
}
