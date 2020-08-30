import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FinanceEvent} from "../shared/financeEvent";

@Injectable({
  providedIn: 'root'
})
export class SynchronizationService {
  private updateSource = new BehaviorSubject(null);
  updatedEvents = this.updateSource.asObservable();

  constructor() { }

  public updateEvent(events: FinanceEvent) {
    this.updateSource.next(events)
  }
}
