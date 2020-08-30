import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  retrieveAllEventsByDate(monthName: string, year: string): Observable<FinanceEvent[]> {
    let monthNumber: number = monthNames.indexOf(monthName) + 1;
    return this.http.get<FinanceEvent[]>(baseurl + "bydate/" + monthNumber + "." + year)
      .pipe(catchError(this.errorProcessor.handleError))
  }

  retrieveMonthBalance(year: string): Observable<any> {
    return this.http.get<any>(baseurl + "balance/" + year)
      .pipe(catchError(this.errorProcessor.handleError))
  }

  retrieveAllEventsByString(query: string): Observable<any> {
    return this.http.get<any>(baseurl + "browse/" + query)
      .pipe(catchError(this.errorProcessor.handleError))
  }

  addNewEvent(event: FinanceEvent): Observable<any> {
    return this.http.post<FinanceEvent>(baseurl, event)
      .pipe(catchError(this.errorProcessor.handleError))
  }


  deleteEvent(event: FinanceEvent): Observable<any> {
    console.log(event.id)
    return this.http.delete<string>(baseurl + event.id)
      .pipe(catchError(this.errorProcessor.handleError))
  }
}
