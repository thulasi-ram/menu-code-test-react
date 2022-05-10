import { render, screen } from '@testing-library/react';
import React from 'react';
import { MenuComponent } from './menu';
import { Dish, DishTypes } from './types';

test('renders menu with menu heading', () => {
    render(
        <MenuComponent
            menu={{
                dishes: [
                    {
                        id: 'TestDish',
                        name: 'TestDish',
                        price: 10,
                        type: DishTypes.Starter,
                    },
                ],
            }}
            addOrRemoveButtonGroup={mockAddorRemove()}
        />
    );
    const element = screen.getByText(/Menu/i);
    expect(element).toBeInTheDocument();

    const menuHeaderElement = element.closest('h3');
    expect(menuHeaderElement).toBeInTheDocument();
});

describe('renders menu with dish category', () => {
    test('should render menu category starter', () => {
        render(
            <MenuComponent
                menu={{
                    dishes: [
                        {
                            id: 'TestDish',
                            name: 'TestDish',
                            price: 10,
                            type: DishTypes.Starter,
                        },
                    ],
                }}
                addOrRemoveButtonGroup={mockAddorRemove()}
            />
        );
        const e1 = screen.getByText(/starter/i);
        expect(e1).toBeInTheDocument();

        const e2 = screen.queryByText(/main/i);
        expect(e2).toBeNull();

        const e3 = screen.queryByText(/dessert/i);
        expect(e3).toBeNull();
    });

    test('should render menu category main', () => {
        render(
            <MenuComponent
                menu={{
                    dishes: [
                        {
                            id: 'TestDish',
                            name: 'TestDish',
                            price: 10,
                            type: DishTypes.Main,
                        },
                    ],
                }}
                addOrRemoveButtonGroup={mockAddorRemove()}
            />
        );
        const e1 = screen.queryByText(/starter/i);
        expect(e1).toBeNull();

        const e2 = screen.queryByText(/main/i);
        expect(e2).toBeInTheDocument();

        const e3 = screen.queryByText(/dessert/i);
        expect(e3).toBeNull();
    });

    test('should render menu category dessert', () => {
        render(
            <MenuComponent
                menu={{
                    dishes: [
                        {
                            id: 'TestDish',
                            name: 'TestDish',
                            price: 10,
                            type: DishTypes.Dessert,
                        },
                    ],
                }}
                addOrRemoveButtonGroup={mockAddorRemove()}
            />
        );
        const e1 = screen.queryByText(/starter/i);
        expect(e1).toBeNull();

        const e2 = screen.queryByText(/main/i);
        expect(e2).toBeNull();

        const e3 = screen.queryByText(/dessert/i);
        expect(e3).toBeInTheDocument();
    });
});

describe('renders dish with proper values', () => {
    test('should render dish category starter', () => {
        render(
            <MenuComponent
                menu={{
                    dishes: [
                        {
                            id: 'TestStarterDishID',
                            name: 'TestStarterDishName',
                            price: 10.11,
                            type: DishTypes.Starter,
                        },
                    ],
                }}
                addOrRemoveButtonGroup={mockAddorRemove()}
            />
        );

        const e2 = screen.queryByText(/TestStarterDishName/i);
        expect(e2).toBeInTheDocument();

        const e3 = screen.queryByText(/10.11/i);
        expect(e3).toBeInTheDocument();
    });

    test('should render menu category main', () => {
        render(
            <MenuComponent
                menu={{
                    dishes: [
                        {
                            id: 'TestMainDishID',
                            name: 'TestMainDishName',
                            price: 99.99,
                            type: DishTypes.Main,
                        },
                    ],
                }}
                addOrRemoveButtonGroup={mockAddorRemove()}
            />
        );

        const e2 = screen.queryByText(/TestMainDishName/i);
        expect(e2).toBeInTheDocument();

        const e3 = screen.queryByText(/99.99/i);
        expect(e3).toBeInTheDocument();
    });

    test('should render menu category dessert', () => {
        render(
            <MenuComponent
                menu={{
                    dishes: [
                        {
                            id: 'TestDessertDishID',
                            name: 'TestDessertDishName',
                            price: 88.88,
                            type: DishTypes.Dessert,
                        },
                    ],
                }}
                addOrRemoveButtonGroup={mockAddorRemove()}
            />
        );

        const e2 = screen.queryByText(/TestDessertDishName/i);
        expect(e2).toBeInTheDocument();

        const e3 = screen.queryByText(/88.88/i);
        expect(e3).toBeInTheDocument();
    });
});

function mockAddorRemove() {
    return (dish: Dish) => <div></div>;
}
