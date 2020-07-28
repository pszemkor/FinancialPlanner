import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  paramsForm: FormGroup;

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.createForm();
  }

  createForm() {
    this.paramsForm = this.fb.group({
      name: "Event name",
      date: null
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.paramsForm.value)
  }

}
