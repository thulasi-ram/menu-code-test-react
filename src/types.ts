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

interface IOrder {
    addItem(dn: Diner, ds: Dish): void;
    removeItem(dn: Diner, ds: Dish): void;
    amount(): number | undefined;
    validate(): [boolean, string];
    dinerDishQuantity(diner: Diner | undefined, dish: Dish): number;
}

class Order implements IOrder {
    dinerDishes: Map<String, Map<IDishType, number>>;

    constructor() {
        this.dinerDishes = new Map<String, Map<IDishType, number>>();
    }

    addItem(dn: Diner, ds: Dish): void {
        let dishes = this.dinerDishes.get(dn.id);
        if (!dishes) {
            dishes = new Map<IDishType, number>();
        }
        let quantity = dishes.get(ds) || 0;
        dishes.set(ds, quantity + 1);
        this.dinerDishes.set(dn.id, dishes);
    }

    removeItem(dn: Diner, ds: Dish): void {
        let dishes = this.dinerDishes.get(dn.id);
        if (!dishes) {
            dishes = new Map<IDishType, number>();
        }
        let quantity = dishes.get(ds) || 0;
        if (quantity <= 0) {
            return;
        }
        dishes.set(ds, quantity - 1);
        this.dinerDishes.set(dn.id, dishes);
    }

    amount(): number | undefined {
        let sum: number | undefined = undefined;

        this.dinerDishes.forEach((dishes, _) => {
            dishes.forEach((quantity, dish) => {
                sum = sum || 0;
                sum += dish.price * quantity;
            });
        });

        return sum;
    }
    
    validate(): [boolean, string] {
        throw new Error('Method not implemented.');
    }
    dinerDishQuantity(diner: Diner | undefined, dish: Dish): number {
        if (!diner) {
            return 0;
        }
        return this.dinerDishes.get(diner.id)?.get(dish) || 0;
    }
}

export { Order };
export type { IDishType, Dish, IOrder, Menu, Diner, StarterDish, MainDish, DessertDish };
