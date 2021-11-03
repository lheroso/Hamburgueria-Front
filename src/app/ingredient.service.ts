import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { calculateDiscountPriceModel } from "./calculateDiscountPriceModel";
import { HamburgerIngredient } from "./hamburgerIngredient";
import { Ingredient } from "./ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  //private ingredientsUrl = 'api/ingredients.json';
  private ingredientsUrl = 'https://localhost:44329/getIngredients';

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  calculateDiscountPrice(hamburgerIngredients:calculateDiscountPriceModel): Observable<number> {
    return this.http.post<number>("https://localhost:44329/getDiscount", hamburgerIngredients)
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
