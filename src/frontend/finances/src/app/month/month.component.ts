import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventsService} from "../services/events.service";
import {FinanceEvent} from "../shared/financeEvent";
import {SynchronizationService} from "../services/synchronization.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {BrowserComponent} from "../browser/browser.component";
import {DescriptionComponent} from "../description/description.component";

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

  constructor(private route: ActivatedRoute, private eventsService: EventsService,
              private synchronizationService: SynchronizationService, private dialog: MatDialog) {
    this.displayedColumns = ['date', 'value', 'name', 'tools'];
  }

  ngOnInit(): void {
    this.monthName = this.route.snapshot.paramMap.get('name');
    this.year = this.route.snapshot.paramMap.get('year');
    this.synchronizationService.updatedEvents.subscribe(_ => this.getEvents())
    this.getEvents();
  }

  private getEvents() {
    this.eventsService.retrieveAllEventsByDate(this.monthName, this.year)
      .subscribe(eventList => this.events = eventList);
  }

  onDeleteButton(event: FinanceEvent): void {
    this.eventsService.deleteEvent(event)
      .subscribe(event => this.synchronizationService.updateEvent(event), error => console.log("err" + error))
  }

  onDescription(description: string) {
    const dialogConfig = this.getDialogConfig();
    dialogConfig.data = {"description": description}
    console.log(description)
    this.dialog.open(DescriptionComponent, dialogConfig);
  }

  private getDialogConfig() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    return dialogConfig;
  }
}
