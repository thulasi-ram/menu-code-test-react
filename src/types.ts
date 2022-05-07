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

type Diner = {
    id: string;
    name: string;
};

interface IInventory {
    stockItem(dish: Dish): void;
    depleteItem(dish: Dish): void;
    has(dish: Dish): boolean;
    quantity(dish: Dish): number;
}

interface IOrder {
    validators: orderValidator[];
    addItem(dn: Diner, ds: Dish): void;
    removeItem(dn: Diner, ds: Dish): void;
    amount(): number | undefined;
    errors(): string[];
    dinerDishQuantity(diner: Diner | undefined, dish: Dish): number;
}

type orderValidator = (order: IOrder) => string | undefined;

export type { IDishType, Dish, IOrder, Menu, Diner, StarterDish, MainDish, DessertDish, IInventory };
