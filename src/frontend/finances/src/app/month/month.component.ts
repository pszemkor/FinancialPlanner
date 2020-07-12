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

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.monthName = this.route.snapshot.paramMap.get('name');
    this.year = this.route.snapshot.paramMap.get('year');
    this.eventsService.retrieveAllEventsByDate(this.monthName, this.year)
      .subscribe(eventList => this.events = eventList);
  }

}
