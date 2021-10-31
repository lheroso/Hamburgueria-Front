import { Ingredient } from "./ingredient";

export interface Hamburger {
  id: number;
  name: string;
  ingredients: Array<Ingredient>;
}