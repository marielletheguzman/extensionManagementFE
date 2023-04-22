import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RenewPartnerServicesService } from './renew-partner-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-renew-partner',
  templateUrl: './renew-partner.component.html',
  styleUrls: ['./renew-partner.component.css'],
})
export class RenewPartnerComponent {
  renew = new FormGroup({
    partnerStartDate: new FormControl(''),
    partnerEndDate: new FormControl(''),
    partnerMoaFile: new FormControl(undefined),
  });

  constructor(
    private renewServices: RenewPartnerServicesService,
    private message: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onOnInit() {}

  onSubmit() {
    const formData = new FormData();
    const partnerStartDate = this.renew.value.partnerStartDate;
    const partnerEndDate = this.renew.value.partnerEndDate;
    if (partnerStartDate) {
      formData.append('partnerStartDate', partnerStartDate);
      console.log('partnerStartDate:', partnerStartDate);
      console.log('formData:', formData);
    }
    if (partnerEndDate) {
      formData.append('partnerEndDate', partnerEndDate);
      console.log('partnerEndDate:', partnerEndDate);
      console.log('formData:', formData);
    }
    if (this.renew.value.partnerMoaFile) {
      formData.append('partnerMoaFile', this.renew.value.partnerMoaFile);
      console.log('partnerMoaFile:', this.renew.value.partnerMoaFile);
      console.log('formData:', formData);
    }

    const id = parseInt(this.route.snapshot.paramMap.get('id')?.trim() ?? '');
    this.renewServices.submit(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Renew Success',
        });
        timer(300)
          .toPromise()
          .then((done) => {
            this.router.navigate(['/admin/expired_partners']);
          });
      },
      (error) => {
        console.log(error);
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to renew',
        });
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.renew.patchValue({
        partnerMoaFile: file,
      });
    }
  }
}
