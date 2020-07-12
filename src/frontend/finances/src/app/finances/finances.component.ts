import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {

  allEvents: Event[];
  currentYear: number;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

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
