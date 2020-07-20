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

  selectedStatus: TicketStatus = new TicketStatus();
  ticketStatuses: TicketStatus[] = [];
  constructor(private escalationService: EscalationService,
    private escalationHttpService: EscalationHttpService) { }

  ngOnInit(): void {
    this.getTicketStatuses();
  }

  getTicketStatuses() {
    this.escalationHttpService.getTicketStatuses().subscribe(
      ticketStatuses => {
        this.ticketStatuses = ticketStatuses;
        this.selectedStatus = this.ticketStatuses.find(x => x.id === 5)
      }
    );
  }

  onSelectStatus() {
    this.escalationService.selectedTicketStatus = this.selectedStatus;
    this.escalationService.selectedTicketStatusId = this.selectedStatus.id;
  }

}
