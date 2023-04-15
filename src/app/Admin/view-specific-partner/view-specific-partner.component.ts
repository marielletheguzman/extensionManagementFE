import { Component } from '@angular/core';
import { ViewSpecificPartnerServicesService } from './view-specific-partner-services.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-specific-partner',
  templateUrl: './view-specific-partner.component.html',
  styleUrls: ['./view-specific-partner.component.css'],
})
export class ViewSpecificPartnerComponent {
  partner: any = { data: {} };

  constructor(
    private viewSpecificpartner: ViewSpecificPartnerServicesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')?.trim() ?? '');
    console.log(id);
    this.viewSpecificpartner.getSpecificPartner(id).subscribe((data: any) => {
      this.partner = data;
      console.log(this.partner);
    });
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
