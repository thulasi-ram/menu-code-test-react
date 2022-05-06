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
    amount(): number | null;
    validate(): [boolean, string];
}

class Order implements IOrder {

    dinerItems: Map<String, Dish[]>

    constructor () {
        this.dinerItems = new Map<String, Dish[]>();
    }
    
    addItem(dn: Diner, ds: Dish): void {
        if (this.dinerItems.has(dn.id)) {
            let dishes = this.dinerItems.get(dn.id)
            dishes?.push(ds)
            this.dinerItems.set(dn.id, dishes!)
        } else {
            this.dinerItems.set(dn.id, [ds])
        }
    }
    amount(): number | null {
        throw new Error('Method not implemented.');
    }
    validate(): [boolean, string] {
        throw new Error('Method not implemented.');
    }
}

export { Order };
export type { IDishType, Dish, IOrder, Menu, Diner, StarterDish, MainDish, DessertDish };
