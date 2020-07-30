import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";
import {EventsService} from "../services/events.service";
import {FinanceEvent} from "../shared/financeEvent";

@Component({
  selector: 'app-browser-results',
  templateUrl: './browser-results.component.html',
  styleUrls: ['./browser-results.component.scss']
})
export class BrowserResultsComponent implements OnInit {
  private name: string;
  private events: FinanceEvent[];


  constructor(private route: ActivatedRoute, private searchService: SearchService, private eventsService: EventsService) {
    this.name = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(name => {
      this.name = name;
      this.eventsService.retrieveAllEventsByString(name).subscribe(events => this.events = events);
    });
  }

}
