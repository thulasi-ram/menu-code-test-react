import { Dish, Diner, IOrder } from './types';

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

export { Order };
