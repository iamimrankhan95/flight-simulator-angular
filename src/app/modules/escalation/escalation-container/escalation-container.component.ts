import { Component, OnInit } from '@angular/core';
import { EscalationService } from '../escalation.service';
import { TicketStatus } from '../../../shared/models/dto/ticket-status-dto';
import { EscalationHttpService } from '../escalation-http.service';

@Component({
  selector: 'app-escalation-container',
  templateUrl: './escalation-container.component.html',
  styleUrls: ['./escalation-container.component.css']
})
export class EscalationContainerComponent implements OnInit {

  selectedStatus: any;
  ticketStatuses: TicketStatus[] = [];
  constructor(private escalationService: EscalationService,
    private escalationHttpService: EscalationHttpService) { }

  ngOnInit(): void {
    this.selectedStatus = 5;
    this.getTicketStatuses();
  }

  getTicketStatuses() {
    this.escalationHttpService.getTicketStatuses().subscribe(
      ticketStatuses => this.ticketStatuses = ticketStatuses
    );
  }

  onSelectStatus(statusId: string) {
    this.escalationService.selectedTicketStatusId = +statusId;
  }

}
