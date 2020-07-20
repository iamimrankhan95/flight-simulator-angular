import { Component, OnInit } from '@angular/core';
import { EscalationService } from '../escalation.service';
import { TicketStatus } from '../../../shared/models/dto/ticket-status-dto';
import { EscalationHttpService } from '../escalation-http.service';
import { ConstantPool } from '@angular/compiler';
import { AppConstant } from '../../../shared/enums/Constants';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-escalation-container',
  templateUrl: './escalation-container.component.html',
  styleUrls: ['./escalation-container.component.css']
})
export class EscalationContainerComponent implements OnInit {

  selectedTicketStatus: any;
  ticketStatuses: TicketStatus[] = [];
  constructor(private escalationService: EscalationService,
    private escalationHttpService: EscalationHttpService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.selectedTicketStatus = '';
    this.getTicketStatuses();
  }

  getTicketStatuses() {
    this.escalationHttpService.getTicketStatuses().subscribe(
      ticketStatuses => {
        if (this.authService.getUserRole() === 'AD') {
          this.ticketStatuses = ticketStatuses.filter(x => AppConstant.ticketStatusForAD.find(y => y.name === x.name));
          // this.selectedTicketStatus = this.ticketStatuses.find(x => x.id === 5);
        } else if (this.authService.getUserRole() === 'RD') {
          this.ticketStatuses = ticketStatuses.filter(x => AppConstant.ticketStatusForRD.find(y => y.name === x.name));
          // this.selectedTicketStatus = this.ticketStatuses.find(x => x.id === 5);
        } else if (this.authService.getUserRole() === 'AGENT') {
          this.ticketStatuses = ticketStatuses.filter(x => AppConstant.ticketStatusForAgent.find(y => y.name === x.name));
          // this.selectedTicketStatus = this.ticketStatuses.find(x => x.id === 5);
        }
      }
    );


  }

  onSelectStatus(ticketStatus) {
    console.log(ticketStatus);
    this.escalationService.changeTickedStatus(this.selectedTicketStatus);
  }

}
