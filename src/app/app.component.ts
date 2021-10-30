import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrediente, Lanche, lanches } from './mock-data';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMessage = '';
  lanches = lanches;
  ingredients: Array<Ingrediente>;
  sub!: Subscription;

  constructor(private ingredientService: IngredientService) {}

  getTotalIngredientPrice(amount:number, price:number): number{
    return amount * price;
  }

  increaseAmount(ingredient:Ingrediente):void {
    ingredient.quantity = ingredient.quantity+1;
  }

  decreaseAmount(ingredient:Ingrediente):void {
    if (ingredient.quantity !=0)
      ingredient.quantity = ingredient.quantity-1;
  }

  getPrice():number {
    //this.ingredients.map(a => a.value).reduce(function(a, b) { return a + b; }
    return this.ingredients.reduce(function(acc, item) {
      return acc + (item.price * item.quantity);
  }, 0);
  }

  selectBurger(lanche: Lanche){
    //let aux = lanches.find(l => l.id == id)?.ingredients;
    this.ingredients = lanche.ingredients;
    //this.testIngredients.push();
  }

  ngOnInit(): void {
    this.sub = this.ingredientService.getIngredients().subscribe({
      next: ingredients => {
        this.ingredients = ingredients;
      },
      error: err => this.errorMessage = err
    });
  }
}
