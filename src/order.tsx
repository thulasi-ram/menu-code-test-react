import React from 'react';
import { Diner, Dish, IOrder } from './types';

class Order implements IOrder {
    diners: Diner[];
    validators: ((order: IOrder) => string | undefined)[];
    dinerDishes: Map<String, Map<Dish, number>>;

    constructor(diners: Diner[]) {
        this.diners = diners;
        this.dinerDishes = new Map<String, Map<Dish, number>>();
        this.validators = [
            validateAtleastTwoCourses,
            validateAtleastOneMainCourse,
            validateEitherPrawnCockTailOrSalmonFillet,
        ];
    }

    addItem(dn: Diner, ds: Dish): void {
        let dishes = this.dinerDishes.get(dn.id);
        if (!dishes) {
            dishes = new Map<Dish, number>();
        }
        let quantity = dishes.get(ds) || 0;
        dishes.set(ds, quantity + 1);
        this.dinerDishes.set(dn.id, dishes);
    }

    removeItem(dn: Diner, ds: Dish): void {
        let dishes = this.dinerDishes.get(dn.id);
        if (!dishes) {
            dishes = new Map<Dish, number>();
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

    errors(): string[] {
        let messages: string[] = [];
        this.validators.forEach((validator) => {
            let message = validator(this);
            if (message !== undefined) {
                messages.push(message);
            }
        });
        return messages;
    }

    dinerDishQuantity(diner: Diner | undefined, dish: Dish): number {
        if (!diner) {
            return 0;
        }
        return this.dinerDishes.get(diner.id)?.get(dish) || 0;
    }

    dishesAndQuantities(diner: Diner | undefined): Map<Dish, number> {
        if (!diner) {
            return new Map<Dish, number>();
        }
        let dishes = this.dinerDishes.get(diner.id);
        if (!dishes) {
            return new Map<Dish, number>();
        }
        return dishes;
    }
}

function OrderSummaryComponent({ order }: { order: IOrder }) {
    let orderAmount = order.amount();
    let orderText = orderAmount ? `$ ${orderAmount}` : '-';
    return (
        <>
            <div>Order Summary</div>
            {orderText}
            {order.errors()}
        </>
    );
}

function validateAtleastTwoCourses(order: IOrder) {
    for(var i = 0; i < order.diners.length; i++) {
        let diner = order.diners[i]; 
        let courses = new Set();
        let dishesAndQuantities = order.dishesAndQuantities(diner);
        dishesAndQuantities.forEach((_, dish) => {
            courses.add(dish.type)
        });
        if (courses.size < 2) {
            console.log("test")
            return `must have atleast 2 courses`
        }
    }
    return undefined;
}

function validateAtleastOneMainCourse(order: IOrder) {
    return undefined;
}

function validateEitherPrawnCockTailOrSalmonFillet(order: IOrder) {
    return undefined;
}

export { Order, OrderSummaryComponent };
