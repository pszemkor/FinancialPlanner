import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  monthName: string;
  year: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.monthName = this.route.snapshot.paramMap.get('name');
    this.year = this.route.snapshot.paramMap.get('year');
  }

}
