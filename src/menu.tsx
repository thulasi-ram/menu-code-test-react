import { useMutation, useQuery } from 'graphql-hooks';
import React, { useState } from 'react';
import { DessertDish, Dish, DishTypes, MainDish, Menu, StarterDish } from './types';

const getMenuQuery = `
  query {
    menu {
      starters {
        id
        name
        price
      }
      mains {
        id
        name
        price
      }
      desserts {
        id
        name
        price
      }
    }
  }
`;

const addStarterMutation = `mutation AddStarter($name: String!, $price: Float!) {
    addStarter(name: $name, price: $price)
}`;

function MenuComponent({ menu, addOrRemoveButtonGroup }: { menu: Menu; addOrRemoveButtonGroup: any }) {
    let groupedDishes = groupBy(menu.dishes, (c: Dish) => c.type);
    return (
        <section className="my-12">
            <div className=" justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center">Menu</h3>
            </div>

            <div className="flow-root">
                <ul role="list" className="">
                    {Object.keys(groupedDishes).map((key: string) => {
                        let dishes: Dish[] = groupedDishes[key];
                        return (
                            <div
                                className="divide-y divide-gray-200 dark:divide-gray-700 my-8"
                                key={`menu-group-${key}`}
                            >
                                <h2 className="uppercase font-bold text-gray-500 text-xs"> {key}</h2>
                                {dishes.map((d) => {
                                    return (
                                        <li className="py-3 sm:py-4" key={`menu-item-${d.id}`}>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={`https://source.unsplash.com/random/150×150/?${d.name}`}
                                                        alt={`${d.name} image`}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {d.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    ${d.price}
                                                </div>
                                                <div className="inline-flex w-4"></div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {addOrRemoveButtonGroup(d)}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

function AddStarterComponent({ name, price }: { name: string; price: number }): JSX.Element {
    const [updateStarter] = useMutation(addStarterMutation);
    const [newName, setNewName] = useState(name);
    const [newPrice, setNewPrice] = useState(price);

    return (
        <div>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input type="number" value={newPrice} onChange={(e) => setNewPrice(parseFloat(e.target.value))} />
            <button onClick={() => updateStarter({ variables: { name: newName, price: newPrice } })}>
                Add Starter
            </button>
        </div>
    );
}

function makeMenuFromQuery(data: any): Menu {
    let dishes: Dish[] = [];
    let menuData = data.menu;

    menuData.starters.forEach((value: any) => {
        let s: StarterDish = { ...value, type: DishTypes.Starter };
        dishes.push(s);
    });
    menuData.mains.forEach((value: any) => {
        let s: MainDish = { ...value, type: DishTypes.Main };
        dishes.push(s);
    });
    menuData.desserts.forEach((value: any) => {
        let s: DessertDish = { ...value, type: DishTypes.Dessert };
        dishes.push(s);
    });

    return { dishes: dishes };
}

function groupBy(xs: any, f: any) {
    return xs.reduce((r: any, v: any, i: any, a: any, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

export { MenuComponent, makeMenuFromQuery, getMenuQuery, addStarterMutation, AddStarterComponent };
