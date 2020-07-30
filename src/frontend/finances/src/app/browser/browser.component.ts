import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventsService} from "../services/events.service";
import {Router} from '@angular/router';
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  paramsForm: FormGroup;
  placeHolder: string = 'Event name'

  constructor(private fb: FormBuilder, private eventsService: EventsService,
              private router: Router, private searchService: SearchService) {
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
    let query = this.paramsForm.value['name'];
    this.router.navigate(['results', query]);
    this.searchService.changeQuery(query);
    console.log(query);
  }

  onClick() {
    this.placeHolder = ''
  }

}
