import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { timer } from 'rxjs';
import { LandingService } from 'src/app/landing-page/landing.service';

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
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private landingService: LandingService,
    private message: MessageService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
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
  selectedAccountId: Number | undefined;
  deleteProgram(id: Number) {
    // this.http
    //   .get<any>(
    //     `http://localhost/extensionManagementRestAPI/controllers/admin/delete-program.php?id=${id}`
    //   )
    //   .subscribe((data) => {
    //     if (data && data['programs']) {
    //       this.users.programs = data.programs;
    //       console.log(data);
    //     }
    //   });

    this.selectedAccountId = id;
    this.confirmationService.confirm({
      message: `Are you sure that you want to continue?`,
      header: 'Approve Account',
      accept: () => {
        // Make an HTTP request to the backend API
        this.http
          .post(
            `http://localhost/extensionManagementRestAPI/controllers/admin/delete-program.php?id=${id}`,
            {}
          )
          .subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Declined',
                detail: 'Account Successfully Declined',
              });
              timer(750)
                .toPromise()
                .then((done) => {
                  window.location.reload();
                });
            },
            (error) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successfully Declined',
                detail: 'Account Successfully Declined',
              });
              timer(500)
                .toPromise()
                .then((done) => {
                  window.location.reload();
                });
            }
          );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled declining account',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled declining account',
            });
            break;
        }
      },
    });
  }
}
