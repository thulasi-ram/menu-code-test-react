import React from 'react';
import { Diner, Dish, IDishType, IOrder } from './types';

class Order implements IOrder {
    validators: ((order: IOrder) => string | undefined)[];
    dinerDishes: Map<String, Map<IDishType, number>>;

    constructor() {
        this.dinerDishes = new Map<String, Map<IDishType, number>>();
        this.validators = [
            validateAtleastTwoCourses,
            validateAtleastOneMainCourse,
            validateEitherPrawnCockTailOrSalmonFillet,
        ];
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
    return "test error";
}

function validateAtleastOneMainCourse(order: IOrder) {
    return "test error1";
}

function validateEitherPrawnCockTailOrSalmonFillet(order: IOrder) {
    return undefined;
}

export { Order, OrderSummaryComponent };
