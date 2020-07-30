import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'app-browser-results',
  templateUrl: './browser-results.component.html',
  styleUrls: ['./browser-results.component.scss']
})
export class BrowserResultsComponent implements OnInit {
  private name: string;


  constructor(private route: ActivatedRoute, private searchService: SearchService) {
    this.name = this.route.snapshot.paramMap.get('name');
  }

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(name => this.name = name);
  }

}
