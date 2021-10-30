export interface Lanche {
    id: number;
    name: string;
  }

export interface Ingrediente{
    id: number,
    name: string,
    price: number
    quantity: number
}

export const lanches: Lanche[] = [
  { id: 11, name: 'Lanche1' },
  { id: 12, name: 'Lanche2' },
  { id: 13, name: 'Lanche3' },
  { id: 14, name: 'Lanche4' },
];

export const ingredientes: Ingrediente[] = [
    {id: 1, name: 'Alface', price: 0.4, quantity: 0},
    {id: 2, name: 'Bacon', price: 2, quantity: 0},
    {id: 3, name: 'Hamburger', price: 4, quantity: 0}
]