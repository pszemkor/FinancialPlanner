import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";
import {EventsService} from "../services/events.service";
import {FinanceEvent} from "../shared/financeEvent";
import {SynchronizationService} from "../services/synchronization.service";

@Component({
  selector: 'app-browser-results',
  templateUrl: './browser-results.component.html',
  styleUrls: ['./browser-results.component.scss']
})
export class BrowserResultsComponent implements OnInit {
  name: string;
  events: FinanceEvent[];
   displayedColumns: string[];


  constructor(private route: ActivatedRoute, private searchService: SearchService,
              private eventsService: EventsService, private synchronizationService :SynchronizationService) {
    this.displayedColumns = ['date', 'value', 'name'];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(m => this.initEventsForName(m.get('name')))
    this.synchronizationService.updatedEvents.subscribe(_ => this.getEvents())
  }

  getEvents(): void{
    this.searchService.currentMessage.subscribe(name => {
      this.initEventsForName(name);
    });
  }

  initEventsForName(name): void{
    this.name = name;
    this.eventsService.retrieveAllEventsByString(name).subscribe(events => this.events = events);
  }

}
