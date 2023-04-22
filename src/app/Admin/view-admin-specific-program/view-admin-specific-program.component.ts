import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-view-admin-specific-program',
  templateUrl: './view-admin-specific-program.component.html',
  styleUrls: ['./view-admin-specific-program.component.css'],
})
export class ViewAdminSpecificProgramComponent {
  @ViewChild('myContainer') myContainer?: ElementRef;
  myForm!: FormGroup;
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
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
      certificate: 'certificate.pdf',
      attendance: 'attendance.pdf',
      invitation: 'invitation.pdf',
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
    private landingService: LandingService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
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
  print() {
    const printContents = this.myContainer?.nativeElement.innerHTML;
    const popupWin = window.open(
      '',
      '_blank',
      'top=0,left=0,height=100%,width=auto'
    );
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>
        <head>
          <title>Print</title>

        </head>
        <body onload="window.print();window.close()"
        backgroundImage: 'url(../../../../../assets/placeholder_templates/placeholderImg.jpg)',
        'background-size': '100% 100%',
        'background-repeat': 'no-repeat'>
        ${printContents}</body>
      </html>`);
    popupWin?.document.close();
  }
}
