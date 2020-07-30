import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsService} from "../services/events.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  paramsForm: FormGroup;
  placeHolder: string = 'Event name'

  constructor(private fb: FormBuilder, private eventsService: EventsService, private router: Router) {
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
    this.router.navigate(['results', this.paramsForm.value['name']]);
    console.log(this.paramsForm.value['name'])
  }

  onClick() {
    this.placeHolder = ''
  }

}
