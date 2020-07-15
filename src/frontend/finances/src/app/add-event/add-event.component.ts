import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FinanceEvent} from "../shared/financeEvent";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  paramsForm: FormGroup;
  newEvent: FinanceEvent;
  types = ["INCOME", "EXPENDITURE"];

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.createForm();
  }

  createForm() {
    this.paramsForm = this.fb.group({
      type: "",
      value: 0,
      name: "Name",
      date: new Date()
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.eventsService.addNewEvent(this.paramsForm.value)
      .subscribe(next => console.log(next), error => console.log(error));
  }
}
