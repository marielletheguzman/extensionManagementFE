import { Component } from '@angular/core';

@Component({
  selector: 'app-terminal-report',
  templateUrl: './terminal-report.component.html',
  styleUrls: ['./terminal-report.component.css'],
})
export class TerminalReportComponent {
  printTerminalReport() {
    console.log('Printing...');
    const printContents = document.querySelector('#terminalReport')?.innerHTML;
    console.log('Print Contents:', printContents);
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      setTimeout(() => {
        window.print();
        document.body.innerHTML = originalContents;
      }, 1000); // Increase delay time to 1 second
    }
  }
}
