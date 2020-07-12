import {Injectable} from '@angular/core';
import {ErrorProcessorService} from "./error-processor.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseurl} from "../shared/baseurl";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient,
              private errorProcessor: ErrorProcessorService) {
  }

  retrieveAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(baseurl)
      .pipe(catchError(this.errorProcessor.handleError));
  }
}
