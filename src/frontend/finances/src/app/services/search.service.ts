import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private querySource = new BehaviorSubject('');
  currentMessage = this.querySource.asObservable();

  constructor() {
  }

  changeQuery(query: string) {
    this.querySource.next(query)
  }
}
