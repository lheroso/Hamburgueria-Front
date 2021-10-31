export interface Lanche {
  id: number;
  name: string;
  ingredients: Array<Ingrediente>;
}

export interface Ingrediente {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

let tempIngredients: Array<Ingrediente> = [
  { id: 1, name: 'Alface', price: 0.4, quantity: 1 },
  { id: 2, name: 'Bacon', price: 2, quantity: 1 },
  { id: 3, name: 'Hamburger', price: 4, quantity: 1 },
];

let tempIngredients2: Array<Ingrediente> = [
  { id: 1, name: 'Alface', price: 0.4, quantity: 1 },
  { id: 3, name: 'Hamburger', price: 4, quantity: 1 },
];

let tempIngredients3: Array<Ingrediente> = [
  { id: 1, name: 'Alface', price: 0.4, quantity: 1 },
  { id: 2, name: 'Bacon', price: 2, quantity: 1 },
];

export const lanches: Lanche[] = [
  { id: 11, name: 'X-Burger', ingredients: tempIngredients },
  { id: 12, name: 'El Lanchao', ingredients: tempIngredients2 },
  { id: 13, name: 'Cold Dog', ingredients: tempIngredients3 },
  { id: 14, name: 'Pizza De Pao', ingredients: tempIngredients },
];
