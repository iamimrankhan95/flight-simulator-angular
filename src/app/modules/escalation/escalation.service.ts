import { Injectable } from '@angular/core';
import { EscalationHttpService } from './escalation-http.service';
import { TicketStatus } from '../../shared/models/dto/ticket-status-dto';
import { Observable, Observer, Subject } from 'rxjs';
import { TicketStatusUpdateDto } from '../../shared/models/dto/ticket-status-update-dto';
import { CRMService } from '../crm/crm.service';

@Injectable({
  providedIn: 'root'
})
export class EscalationService {

  ticketStatuses: TicketStatus[] = [];
  selectedTicketStatusId: number;
  selectedTicketStatus: TicketStatus;

  private ticketStatusChangedSource = new Subject<TicketStatus>();
  ticketStatusChanged$ = this.ticketStatusChangedSource.asObservable();

  constructor(
    private crmService: CRMService
  ) { }

  convertToTicketStatusUpdateDto(statusData: any): TicketStatusUpdateDto {
    let ticketStatusUpdateDto = new TicketStatusUpdateDto();
    ticketStatusUpdateDto.departmentId = statusData.department;
    ticketStatusUpdateDto.ticketStatusId = this.selectedTicketStatus.id;
    ticketStatusUpdateDto.crmRecordId = this.crmService.selectedCrmId;
    ticketStatusUpdateDto.comments = statusData.message;
    return ticketStatusUpdateDto;
  }

  changeTickedStatus(ticketStatus: TicketStatus) {
    console.log(ticketStatus);
    this.selectedTicketStatus = ticketStatus;
    this.ticketStatusChangedSource.next(ticketStatus);
  }
}
