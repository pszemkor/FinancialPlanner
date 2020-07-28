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
  placeHolder: string = 'Event name'

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.createForm();
  }

  createForm() {
    this.paramsForm = this.fb.group({
      name: ""
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.paramsForm.value)
  }

  onClick() {
    this.placeHolder = ''
  }

}
