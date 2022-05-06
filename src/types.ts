interface IDishType {
    id: string;
    name: string;
    price: number;
}

type StarterDish = IDishType;
type MainDish = IDishType;
type DessertDish = IDishType;

type Dish = StarterDish | MainDish | DessertDish;

type Menu = {
    dishes: Dish[];
};

type Diner = {};

interface IOrder {
    addItem(dn: Diner, ds: Dish): void;
    amount(): number | null;
    validate(): [boolean, string];
}


class Order implements IOrder {
  addItem(dn: Diner, ds: Dish): void {
      throw new Error('Method not implemented.');
  }
  amount(): number | null {
      throw new Error('Method not implemented.');
  }
  validate(): [boolean, string] {
      throw new Error('Method not implemented.');
  }
}

export type { IDishType, Dish, IOrder, Menu, Diner, StarterDish, MainDish, DessertDish, Order };
