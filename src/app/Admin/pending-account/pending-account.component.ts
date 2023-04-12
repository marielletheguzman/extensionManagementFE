import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ProgramListService } from '../../User/show-list/program-list.service';

@Component({
  selector: 'app-pending-account',
  templateUrl: './pending-account.component.html',
  styleUrls: ['./pending-account.component.css'],
})
export class PendingAccountComponent {
  pendingAccounts: {
    counts: string;
    pending: [
      {
        fullName: string;
        email: string;
        position: string;
      }
    ];
  }[] = [];

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private programService: ProgramListService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    this.programService.getPrograms().subscribe((data: any) => {
      // this.programs = data.extensionPrograms;
    });
  }

  //redirect to view on the other page
  onView(id: string) {
    this.router.navigate(['/program-details', id]);
  }
}
