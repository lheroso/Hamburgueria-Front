import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientService } from './ingredient.service';
import { HamburgerService } from './hamburger.service';
import { Hamburger } from './hamburger';
import { Ingredient } from './ingredient';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMessage = '';
  hamburgers: Array<Hamburger>;
  ingredients: Array<Ingredient>;
  initIngredients: Array<Ingredient>;
  sub!: Subscription;

  constructor(private ingredientService: IngredientService, private hamburgerService: HamburgerService) {}

  getTotalIngredientPrice(amount:number, price:number): number{
    return amount * price;
  }

  increaseAmount(ingredient:Ingredient):void {
    ingredient.quantity = ingredient.quantity+1;
  }

  decreaseAmount(ingredient:Ingredient):void {
    if (ingredient.quantity !=0)
      ingredient.quantity = ingredient.quantity-1;
  }

  getPrice():number {
    return this.ingredients.reduce(function(acc, item) {
      return acc + (item.price * item.quantity);
  }, 0);
  }

  selectBurger(burger: Hamburger){

    this.ingredients = this.initIngredients.slice();
    this.ingredients = this.ingredients.map(ingredient => {
      let lancheIngredient = burger.ingredients.find(element => element.id === ingredient.id)
      return lancheIngredient ? lancheIngredient : ingredient
    }).slice()
  }

  ngOnInit(): void {

    this.sub = this.ingredientService.getIngredients().subscribe({
      next: ingredients => {
        this.ingredients = ingredients;
        this.initIngredients = ingredients;
      },
      error: err => this.errorMessage = err
    });
    
    this.sub = this.hamburgerService.getHamburgers().subscribe({
      next: hamburgers => {
        this.hamburgers = hamburgers;
      },
      error: err => this.errorMessage = err
    });

  }

}
