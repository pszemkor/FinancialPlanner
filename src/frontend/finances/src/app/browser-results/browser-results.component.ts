import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-browser-results',
  templateUrl: './browser-results.component.html',
  styleUrls: ['./browser-results.component.scss']
})
export class BrowserResultsComponent implements OnInit {
  private name: string;


  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
  }

}
