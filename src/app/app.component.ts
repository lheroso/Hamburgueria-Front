import { Component, OnInit, SimpleChanges} from '@angular/core';
import { IngredientService } from './ingredient.service';
import { HamburgerService } from './hamburger.service';
import { Hamburger } from './hamburger';
import { Ingredient } from './ingredient';
import { HamburgerIngredient } from './hamburgerIngredient';
import { calculateDiscountPriceModel } from './calculateDiscountPriceModel';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selectedBurger = false; //toggle for the HTML ingredient section
  burgerID = 0;
  ordered = false; //toggle for the final screen
  errorMessage = '';
  discount = 0; //variable for the discount value
  hamburgers: Array<Hamburger>; //list of hamburgers from server side
  ingredients: Ingredient[] = []; //list of ingredients from server side
  hamburgerIngredients:HamburgerIngredient[] = [];

  constructor(private ingredientService: IngredientService, private hamburgerService: HamburgerService) {}

  getTotalIngredientPrice(ingredient:Ingredient): number{
    //return amount * price;
    return 0;
  }

  increaseAmount(ingredient:Ingredient):void {
    let index;
    index = this.hamburgerIngredients.findIndex(t => t.IngredientID == ingredient.ingredientID);
    if(index==-1){
      this.hamburgerIngredients.push({ HamburgerID: this.burgerID, IngredientID: ingredient.ingredientID, IngredientQuantity: 1 })
    }
    else
      this.hamburgerIngredients[index].IngredientQuantity = this.hamburgerIngredients[index].IngredientQuantity+1
    this.setDiscount();
  }

  decreaseAmount(ingredient:Ingredient):void {
    this.setDiscount();
    let index;
    index = this.hamburgerIngredients.findIndex(t => t.IngredientID == ingredient.ingredientID);
    if (this.hamburgerIngredients[index].IngredientQuantity !=0)
      this.hamburgerIngredients[index].IngredientQuantity = this.hamburgerIngredients[index].IngredientQuantity-1
    this.setDiscount();
  }

  getPrice():number {
    let finalPrice = 0;
    this.ingredients.forEach(ingredient => {
      finalPrice = finalPrice + ingredient.price * this.getIngredientQuantity(ingredient.ingredientID);
    });

    return finalPrice;

  }

  setDiscount():void {
    let calculateDiscountPriceModel: calculateDiscountPriceModel = {HamburgerIngredient: this.hamburgerIngredients, Ingredient: this.ingredients} ;

    this.ingredientService.calculateDiscountPrice(calculateDiscountPriceModel).subscribe({
      next: item => {
      this.discount=item;
    },
    error: err => this.errorMessage = err
    })
  }

  getIngredientQuantity(ingredientID:number):number{
    return this.hamburgerIngredients.find(t => t.IngredientID == ingredientID)?.IngredientQuantity || 0;
  }

  loadHomePage():void{
    window.location.reload();
  }

  selectBurger(burger: Hamburger){

    this.burgerID = burger.hamburgerID;
    this.hamburgerService.getHamburgerIngredients(String(burger.hamburgerID)).subscribe({
      next: item => {
      let ingredients = item;
      ingredients.forEach(ingredient => {
        this.hamburgerIngredients.push({ HamburgerID: burger.hamburgerID, IngredientID: ingredient.ingredientID, IngredientQuantity: 1 })
      });

      this.setDiscount();
      this.selectedBurger = true;
    },
    error: err => this.errorMessage = err
    });

  }

  toggleOrdered(): void {
    this.ordered = true;
  }

  ngOnInit(): void {

    this.ingredientService.getIngredients().subscribe({
      next: items => {
        this.ingredients = items;

      },
      error: err => this.errorMessage = err
    });
    
    this.hamburgerService.getHamburgers().subscribe({
      next: hamburgers => {
        this.hamburgers = hamburgers;
      },
      error: err => this.errorMessage = err

    });
  }

}
