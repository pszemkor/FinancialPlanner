import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../services/events.service";
import {FinanceEvent} from "../shared/financeEvent";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  monthName: string;
  year: string;
  events: FinanceEvent[]
  displayedColumns: string[];

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {
    this.displayedColumns = ['date', 'value', 'name', 'tools'];
  }

  ngOnInit(): void {
    this.monthName = this.route.snapshot.paramMap.get('name');
    this.year = this.route.snapshot.paramMap.get('year');
    this.getEvents();
  }

  private getEvents() {
    this.eventsService.retrieveAllEventsByDate(this.monthName, this.year)
      .subscribe(eventList => this.events = eventList);
  }

  onDeleteButton(event: FinanceEvent): void {
    this.eventsService.deleteEvent(event)
      .subscribe(value => console.log(value), error => console.log(error))
    // .subscribe(value => this.getEvents());
  }

}
