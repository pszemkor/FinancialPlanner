import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events.service";
import {monthNames} from "../shared/months";
import {SynchronizationService} from "../services/synchronization.service";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  currentYear: number;
  monthNames = monthNames;
  balance: any;

  constructor(private eventsService: EventsService, private synchronizationService :SynchronizationService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getEvents();
    this.synchronizationService.updatedEvents.subscribe(_ => this.getEvents())
  }

  private getEvents() {
    this.eventsService.retrieveMonthBalance(String(this.currentYear))
      .subscribe(events => this.balance = events, error => console.log(error));
  }

  onPreviousMonth() {
    this.currentYear --;
    this.getEvents();
  }

  onNextMonth(){
    this.currentYear ++;
    this.getEvents();
  }
}
