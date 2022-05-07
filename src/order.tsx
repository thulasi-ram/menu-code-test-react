import React from 'react';
import { Diner, Dish, DishTypes, IOrder } from './types';

class Order implements IOrder {
    diners: Diner[];
    validators: ((order: IOrder) => string[])[];
    dinerDishes: Map<String, Map<Dish, number>>;

    constructor(diners: Diner[]) {
        this.diners = diners;
        this.dinerDishes = new Map<String, Map<Dish, number>>();
        this.validators = [
            validateAtleastTwoCourses,
            validateAtleastOneMainCourse,
            validateEitherPrawnCockTailOrSalmonFillet,
            validateNoMoreThanOneCourseType,
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
        if (quantity < 0) {
            quantity = 0;
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
            let vmessages = validator(this);
            messages.push(...vmessages);
        });
        return messages;
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
            {order.errors().map((err, idx) => (
                <p key={`${idx}-err`}>{err}</p>
            ))}
        </>
    );
}

function validateAtleastTwoCourses(order: IOrder): string[] {
    let errors: string[] = [];
    order.diners.forEach((diner) => {
        let courses = new Set();
        let dishesAndQuantities = order.dishesAndQuantities(diner);
        dishesAndQuantities.forEach((quantity, dish) => {
            if (quantity) {
                courses.add(dish.type);
            }
        });
        if (courses.size < 2) {
            errors.push(`${diner.name} must have atleast 2 courses`);
        }
    });
    return errors;
}

function validateAtleastOneMainCourse(order: IOrder): string[] {
    let errors: string[] = [];

    order.diners.forEach((diner) => {
        let courses = new Set();
        let dishesAndQuantities = order.dishesAndQuantities(diner);
        dishesAndQuantities.forEach((quantity, dish) => {
            if (quantity) {
                courses.add(dish.type);
            }
        });
        if (!courses.has(DishTypes.Main)) {
            errors.push(`${diner.name} must have atleast one main course`);
        }
    });
    return errors;
}

function validateEitherPrawnCockTailOrSalmonFillet(order: IOrder): string[] {
    let errors: string[] = [];

    order.diners.forEach((diner) => {
        let dishNames = new Set();
        let dishesAndQuantities = order.dishesAndQuantities(diner);
        dishesAndQuantities.forEach((quantity, dish) => {
            if (quantity) {
                dishNames.add(dish.name);
            }
        });
        if (dishNames.has('Salmon fillet') && dishNames.has('Prawn cocktail')) {
            errors.push(`${diner.name} cannot haves Prawn cocktail and Salmon fillet in the same meal`);
        }
    });
    return errors;
}

function validateNoMoreThanOneCourseType(order: IOrder): string[] {
    let errors: string[] = [];

    order.diners.forEach((diner) => {
        let dishTypes = new Set();
        let dishesAndQuantities = order.dishesAndQuantities(diner);
        dishesAndQuantities.forEach((quantity, dish) => {
            console.log(dishTypes, quantity, dish);
            if (quantity) {
                if (dishTypes.has(dish.type)) {
                    errors.push(`${diner.name} cannot haves more than one same course type`);
                }
                dishTypes.add(dish.type);
            }
        });
    });
    return errors;
}

export { Order, OrderSummaryComponent };
