import { Component, OnInit } from '@angular/core';
import { EscalationService } from '../escalation.service';
import { TicketStatus } from '../../../shared/models/dto/ticket-status-dto';

@Component({
  selector: 'app-escalation-container',
  templateUrl: './escalation-container.component.html',
  styleUrls: ['./escalation-container.component.css']
})
export class EscalationContainerComponent implements OnInit {

  selectedStatus:any;
  ticketStatuses: TicketStatus[] = [];
  constructor(private escalationService: EscalationService) { }

  ngOnInit(): void {
    this.selectedStatus = 5;
    this.getTicketStatuses();
  }
  getTicketStatuses() {
    this.escalationService.getTicketStatuses().subscribe(
      ticketStatuses => this.ticketStatuses = ticketStatuses
    );
  }

}
