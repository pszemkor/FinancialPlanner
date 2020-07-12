import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events.service";
import {monthNames} from "../shared/months";
import {FinanceEvent} from "../shared/financeEvent";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {

  allEvents: FinanceEvent[];
  currentYear: number;
  monthNames = monthNames;

  constructor(private eventsService: EventsService) {
    this.currentYear = new Date().getFullYear();
    this.getAllEvents()
  }

  ngOnInit(): void {
  }

  getAllEvents() {
    this.eventsService.retrieveAllEvents().subscribe(events => this.allEvents = events)
  }

}
