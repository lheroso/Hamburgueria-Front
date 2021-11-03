import { HamburgerIngredient } from "./hamburgerIngredient";
import { Ingredient } from "./ingredient";

export interface calculateDiscountPriceModel {
  HamburgerIngredient: Array<HamburgerIngredient>;
  Ingredient: Array<Ingredient>;
}

