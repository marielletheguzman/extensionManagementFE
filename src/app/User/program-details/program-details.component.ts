import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramDetailsService } from './program-details.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LandingService } from 'src/app/landing-page/landing.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent {
  @ViewChild('myContainer') myContainer?: ElementRef;
  systemProfile = {
    Logo: '',
    WebsiteName: '',
    ThemeColor: '',
    Description: '',
    MainImg: '',
  };
  program = {
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
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private landingService: LandingService,
    private programService: ProgramDetailsService
  ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    const id = this.route.snapshot.paramMap.get('id')?.trim() ?? '';
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.http
      .get<any>(
        `http://localhost/extensionManagementRestAPI/controllers/users/show_specific_program.php?id=${id}`,
        { headers }
      )
      .subscribe((data) => {
        this.program = data;
        console.log(this.program);
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
}
