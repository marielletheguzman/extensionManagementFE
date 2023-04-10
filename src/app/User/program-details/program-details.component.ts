import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramDetailsService } from './program-details.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css'],
})
export class ProgramDetailsComponent {
  program: any;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramDetailsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')?.trim() ?? '';

    this.programService.getProgram(id).subscribe((data: any) => {
      this.program = data;
      console.log(this.program);
    });
  }
}
