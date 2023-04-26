import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LandingService } from 'src/app/landing-page/landing.service';

@Component({
  selector: 'app-finished-list-of-programs',
  templateUrl: './finished-list-of-programs.component.html',
  styleUrls: ['./finished-list-of-programs.component.css'],
})
export class FinishedListOfProgramsComponent {
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
    private http: HttpClient,
    private landingService: LandingService,
    private fb: FormBuilder,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.landingService.getSystemProfile().subscribe((data: any) => {
      this.systemProfile = data;
      console.log(this.systemProfile);
    });
    this.http
      .get<any>(
        'http://localhost/extensionManagementRestAPI/controllers/admin/show_all_finished_programs.php'
      )
      .subscribe((data) => {
        if (data && data['programs']) {
          this.users.programs = data.programs;
          console.log(data);
        }
      });
  }
}
