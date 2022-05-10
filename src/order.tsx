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
    let quantities = new Map<Dish, number>();
    let hasErrors = order.errors().length > 0;
    order.diners.forEach((diner) => {
        order.dishesAndQuantities(diner).forEach((quantity, dish) => {
            let val = quantities.get(dish) || 0;
            quantities.set(dish, val + quantity);
        });
    });

    return (
        <section className="p-8 m-3 bg-white rounded-lg border shadow-md mr-32">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Order Summary</h3>
            </div>
            {hasErrors && (
                <div className="p-4 text-red-700 border rounded border-red-900/10 bg-red-50" role="alert">
                    <strong className="text-sm font-medium"> There are some issues with order </strong>

                    <ul className="mt-1 ml-2 text-xs list-disc list-inside">
                        {order.errors().map((err, idx) => (
                            <li key={`${idx}-err`}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="my-5">
                <table className="w-full text-sm divide-y-2 divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 font-bold text-xs text-left text-gray-500 whitespace-nowrap uppercase">
                                Dish
                            </th>
                            <th className="px-4 py-2 font-bold text-xs text-gray-500 whitespace-nowrap text-center uppercase">
                                Quantity
                            </th>
                            <th className="px-4 py-2 font-bold text-xs text-gray-500 whitespace-nowrap uppercase text-center">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {Array.from(quantities.keys()).map((dish: Dish) => {
                            let q = quantities.get(dish)!;
                            if (q <= 0) {
                                return <></>;
                            }
                            return (
                                <tr key={`order-summary-${dish.id}`}>
                                    <td className="px-4 py-2 text-gray-800 font-medium whitespace-nowrap">
                                        {dish.name}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap text-center">
                                        {q} x ${dish.price}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap text-center">
                                        $ {dish.price * q}
                                    </td>
                                </tr>
                            );
                        })}

                        <tr>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"></td>
                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap text-center text-sm font-medium">
                                Order Total
                            </td>
                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap text-center text-sm font-bold">
                                {orderText}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button
                className="w-full bg-rose-800 rounded text-white inline-block px-12 py-3 text-medium cursor-pointer font-medium my-10 disabled:bg-slate-300 disabled:cursor-auto"
                disabled={hasErrors}
            >
                {' '}
                Place Order{' '}
            </button>
        </section>
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
            errors.push(`${diner.name} cannot have Prawn cocktail and Salmon fillet in the same meal`);
        }
    });
    return errors;
}

function validateNoMoreThanOneCourseType(order: IOrder): string[] {
    let errors: string[] = [];

    order.diners.forEach((diner) => {
        let dishTypes = new Set();
        let dishesAndQuantities = order.dishesAndQuantities(diner);
        let errorAppended = false;
        dishesAndQuantities.forEach((quantity, dish) => {
            if (quantity) {
                if (dishTypes.has(dish.type)) {
                    !errorAppended && errors.push(`${diner.name} cannot have more than one same course type`);
                    errorAppended = true;
                }
                dishTypes.add(dish.type);
            }
        });
    });
    return errors;
}

export { Order, OrderSummaryComponent };
