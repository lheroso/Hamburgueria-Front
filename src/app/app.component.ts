import { Component, OnInit, SimpleChanges} from '@angular/core';
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
export class AppComponent implements OnInit{
  selectedBurger = false; //toggle for the HTML ingredient section
  ordered = false; //toggle for the final screen
  errorMessage = '';
  discount = 0; //variable for the discount value
  hamburgers: Array<Hamburger>; //list of hamburgers from server side
  ingredients: Ingredient[] = []; //list of ingredients from server side
  initIngredients: Ingredient[] = [];
  sub!: Subscription;

  constructor(private ingredientService: IngredientService, private hamburgerService: HamburgerService) {}

  getTotalIngredientPrice(amount:number, price:number): number{
    return amount * price;
  }

  increaseAmount(ingredient:Ingredient):void {
    ingredient.quantity = ingredient.quantity+1;
    this.setDiscount();
  }

  decreaseAmount(ingredient:Ingredient):void {
    if (ingredient.quantity !=0)
      ingredient.quantity = ingredient.quantity-1;
    this.setDiscount();
  }

  getPrice():number {
    return this.ingredients.reduce(function(acc, item) {
      return acc + (item.price * item.quantity);
    }, 0);
  }

  setDiscount():void {
    this.ingredientService.calculateDiscountPrice(this.ingredients).subscribe({
      next: item => {
      this.discount=item;
    },
    error: err => this.errorMessage = err
    })
  }

  loadHomePage():void{
    window.location.reload();
  }

  selectBurger(burger: Hamburger){
    this.ingredients = [...this.initIngredients];
    let burgerIngredients = [...burger.ingredients]
    this.ingredients = this.ingredients.map(item => {
      let lancheIngredient = burgerIngredients.find(element => element.id === item.id)
      return lancheIngredient ? lancheIngredient : item
    })
    this.setDiscount();
    this.selectedBurger = true;
  }

  toggleOrdered(): void {
    this.ordered = true;
  }

  ngOnInit(): void {

    this.sub = this.ingredientService.getIngredients().subscribe({
      next: items => {
        this.initIngredients = items;
        this.ingredients = items;

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
