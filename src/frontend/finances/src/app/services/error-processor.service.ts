import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorProcessorService {

  constructor() {
  }

  public handleError(errorResponse: HttpErrorResponse | any) {
    let errorMessage: string;
    console.log(errorResponse)

    if (errorResponse instanceof ErrorEvent) {
      errorMessage = errorResponse.error.message;
    } else {
      errorMessage = `${errorResponse.status || ''} ${errorResponse.statusText || ''} Server error`;
    }

    return throwError(errorMessage);
  }
}
