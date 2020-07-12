import {Injectable} from '@angular/core';
import {ErrorProcessorService} from "./error-processor.service";
import {HttpClient} from "@angular/common/http";
import {baseurl} from "../shared/baseurl";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient,
              private errorProcessor: ErrorProcessorService) {
  }

  retrieveAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(baseurl + "all")
      .pipe(catchError(this.errorProcessor.handleError));
  }
}
