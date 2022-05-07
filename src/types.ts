enum DishTypes {
    Starter = 'starter',
    Main = 'main',
    Dessert = 'dessert'
}
interface IBaseDish {
    id: string;
    name: string;
    price: number;
    type: DishTypes
}

type StarterDish = IBaseDish & {type: DishTypes.Starter};
type MainDish = IBaseDish & {type: DishTypes.Main};
type DessertDish = IBaseDish & {type: DishTypes.Dessert};

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
    diners: Diner[]
    validators: orderValidator[];
    addItem(dn: Diner, ds: Dish): void;
    removeItem(dn: Diner, ds: Dish): void;
    amount(): number | undefined;
    errors(): string[];
    dinerDishQuantity(diner: Diner | undefined, dish: Dish): number;
    dishesAndQuantities(diner: Diner | undefined): Map<Dish, number>
}

type orderValidator = (order: IOrder) => string | undefined;

export {DishTypes}
export type { Dish, IOrder, Menu, Diner, StarterDish, MainDish, DessertDish, IInventory };
