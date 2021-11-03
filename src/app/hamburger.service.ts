import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { Hamburger } from "./hamburger";
import { HamburgerIngredient } from "./hamburgerIngredient";
import { Ingredient } from "./ingredient";

@Injectable({
  providedIn: 'root'
})
export class HamburgerService {
  private hamburgerUrl = 'https://localhost:44329/getBurgers';
  private hamburgerIngredientUrl = 'https://localhost:44329/getBurgerIngredients';

  constructor(private http: HttpClient) { }

  getHamburgers(): Observable<Hamburger[]> {
    return this.http.get<Hamburger[]>(this.hamburgerUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getHamburgerIngredients(hid:String): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.hamburgerIngredientUrl + '?hid=' + hid)
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
