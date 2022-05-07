import { Dish, IDishType, IInventory } from './types';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Limits cheesecake inventory to 1
class LimitedCheeseCakeInventory implements IInventory {
    inventory: Map<String, number>;

    constructor(dishes: Dish[]) {
        this.inventory = new Map<String, number>(); // dishID, inventory
        dishes.forEach((d) => {
            if (d.name === 'Cheesecake') {
                this.inventory.set(d.id, 1);
            } else {
                this.inventory.set(d.id, getRandomInt(10, 20));
            }
        });
    }
    stockItem(dish: IDishType): void {
        let quantity = this.quantity(dish)
        this.inventory.set(dish.id, quantity + 1)
    }

    depleteItem(dish: IDishType): void {
        let quantity = this.quantity(dish)
        if (quantity < 1) {
            throw "cannot deplete quantity"
        }
        this.inventory.set(dish.id, quantity - 1)
    }

    has(dish: IDishType): boolean {
        return this.quantity(dish) ? true : false;
    }
    quantity(dish: IDishType): number {
        return this.inventory.get(dish.id) || 0;
    }
}

export { LimitedCheeseCakeInventory };
