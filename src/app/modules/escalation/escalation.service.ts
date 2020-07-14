import { Injectable } from '@angular/core';
import { EscalationHttpService } from './escalation-http.service';
import { TicketStatus } from '../../shared/models/dto/ticket-status-dto';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscalationService {

  ticketStatuses: TicketStatus[] = [];
  constructor(
    private escalationHttpService: EscalationHttpService
  ) { }

  getTicketStatuses(): Observable<TicketStatus[]> {
    return new Observable((observer: Observer<TicketStatus[]>) => {
      if (this.ticketStatuses.length > 0) {
        observer.next(this.ticketStatuses);
      } else {
        this.escalationHttpService.getTicketStatuses().subscribe(
          (ticketStatuses: TicketStatus[]) => {
            this.ticketStatuses = ticketStatuses;
            observer.next(this.ticketStatuses);
          }
        );
      }
    });
  }
}
