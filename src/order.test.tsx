import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { Order, OrderSummaryComponent } from './order';
import { Diner, Dish, DishTypes, IOrder } from './types';

test('renders order summary heading', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const order: IOrder = new Order(diners);
    render(<OrderSummaryComponent order={order} />);
    const element = screen.getByText(/Order Summary/i);
    expect(element).toBeInTheDocument();

    const menuHeaderElement = element.closest('h3');
    expect(menuHeaderElement).toBeInTheDocument();
});

test('renders place order to be disabled', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const order: IOrder = new Order(diners);
    render(<OrderSummaryComponent order={order} />);
    const element = screen.getByText(/Place Order/i);
    expect(element).toBeInTheDocument();

    const menuHeaderElement = element.closest('button');
    expect(menuHeaderElement).toBeDisabled();
});

test('renders place order to be enabled if there are no errors in order', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const dishes: Dish[] = [
        {
            id: 'starter1',
            name: 'Starter1',
            price: 5,
            type: DishTypes.Starter,
        },

        {
            id: 'main1',
            name: 'Main1',
            price: 11,
            type: DishTypes.Main,
        },
    ];

    const order: IOrder = new Order(diners);
    order.addItem(diners[0], dishes[0]);
    order.addItem(diners[0], dishes[1]);
    order.addItem(diners[1], dishes[0]);
    order.addItem(diners[1], dishes[1]);

    expect(order.errors()).toEqual([]);

    render(<OrderSummaryComponent order={order} />);
    const element = screen.getByText(/Place Order/i);
    expect(element).toBeInTheDocument();

    const menuHeaderElement = element.closest('button');
    expect(menuHeaderElement).not.toBeDisabled();
});

test('renders error block if there are errors in order', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const order: IOrder = new Order(diners);

    expect(order.errors()).toEqual([
        'Diner1 must have atleast 2 courses',
        'Diner2 must have atleast 2 courses',
        'Diner1 must have atleast one main course',
        'Diner2 must have atleast one main course',
    ]);

    render(<OrderSummaryComponent order={order} />);
    const element = screen.getByText(/There are some issues with order/i);
    expect(element).toBeInTheDocument();
});

test('does not render error block if there are no errors in order', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const dishes: Dish[] = [
        {
            id: 'starter1',
            name: 'Starter1',
            price: 5,
            type: DishTypes.Starter,
        },

        {
            id: 'main1',
            name: 'Main1',
            price: 11,
            type: DishTypes.Main,
        },
    ];

    const order: IOrder = new Order(diners);
    order.addItem(diners[0], dishes[0]);
    order.addItem(diners[0], dishes[1]);
    order.addItem(diners[1], dishes[0]);
    order.addItem(diners[1], dishes[1]);

    expect(order.errors()).toEqual([]);

    render(<OrderSummaryComponent order={order} />);
    const element = screen.queryByText(/There are some issues with order/i);
    expect(element).toBeNull();
});

test('renders order total correctly', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const dishes: Dish[] = [
        {
            id: 'starter1',
            name: 'Starter1',
            price: 5,
            type: DishTypes.Starter,
        },

        {
            id: 'main1',
            name: 'Main1',
            price: 10,
            type: DishTypes.Main,
        },
    ];

    const order: IOrder = new Order(diners);
    order.addItem(diners[0], dishes[0]);
    order.addItem(diners[0], dishes[1]);
    order.addItem(diners[0], dishes[1]); // add same dish twice
    order.addItem(diners[1], dishes[0]);
    order.addItem(diners[1], dishes[1]);

    expect(order.errors()).toEqual([]);

    render(<OrderSummaryComponent order={order} />);
    const element = screen.getByText(/Order Total/i).closest('tr');
    const totalElem = within(element!).queryByText('$ 40');
    expect(totalElem).not.toBeNull();
    expect(totalElem).toBeInTheDocument();
});
