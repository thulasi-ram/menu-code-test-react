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

export type { IDishType, Dish, IOrder, Menu, Diner, StarterDish, MainDish, DessertDish };
