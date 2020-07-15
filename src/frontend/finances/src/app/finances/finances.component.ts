import {Component, OnInit} from '@angular/core';
import {EventsService} from "../services/events.service";
import {monthNames} from "../shared/months";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  currentYear: number;
  monthNames = monthNames;
  balance: any;

  constructor(private eventsService: EventsService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.eventsService.retrieveMonthBalance(String(this.currentYear))
      .subscribe(events => this.balance = events, error => console.log(error));
  }
}
