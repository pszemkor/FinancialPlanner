import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsService} from "../services/events.service";
import {SynchronizationService} from "../services/synchronization.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  paramsForm: FormGroup;
  types = ["INCOME", "EXPENDITURE"];

  constructor(private fb: FormBuilder, private eventsService: EventsService,
              private synchronizationService: SynchronizationService) {
    this.createForm();
  }

  createForm() {
    this.paramsForm = this.fb.group({
      type: null,
      value: 0.00,
      name: "Event name",
      date: new Date(),
      description: ""
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.eventsService.addNewEvent(this.paramsForm.value)
      .subscribe(next => this.synchronizationService.updateEvent(next), error => console.log(error));
  }
}
