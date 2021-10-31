import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Hamburger } from "./hamburger";

@Injectable({
  providedIn: 'root'
})
export class HamburgerService {
  private hamburgerUrl = 'api/hamburgers.json';

  constructor(private http: HttpClient) { }

  getHamburgers(): Observable<Hamburger[]> {
    return this.http.get<Hamburger[]>(this.hamburgerUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
