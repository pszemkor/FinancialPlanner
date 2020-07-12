import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {baseurl} from "../shared/baseurl";
import {monthNames} from "../shared/months";
import {ErrorProcessorService} from "./error-processor.service";
import {FinanceEvent} from "../shared/financeEvent"

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient,
              private errorProcessor: ErrorProcessorService) {
  }

  retrieveAllEvents(): Observable<FinanceEvent[]> {
    return this.http.get<FinanceEvent[]>(baseurl + "all")
      .pipe(catchError(this.errorProcessor.handleError));
  }

  retrieveAllEventsByDate(monthName: string, year: string): Observable<FinanceEvent[]> {
    let monthNumber: number = monthNames.indexOf(monthName) + 1;
    return this.http.get<FinanceEvent[]>(baseurl + "bydate/" + monthNumber + "." + year)
      .pipe(catchError(this.errorProcessor.handleError))
  }
}
