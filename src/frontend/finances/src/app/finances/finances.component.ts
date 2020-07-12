import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {

  allEvents: Event[];

  constructor(private eventsService: EventsService) {
    this.getAllEvents()
  }

  ngOnInit(): void {
  }

  getAllEvents() {
    this.eventsService.retrieveAllEvents().subscribe(events => this.allEvents = events)
  }

}
