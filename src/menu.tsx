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
    return (
        <>
            <div>Dishes</div>
            {menu.dishes.map((d) => {
                return (
                    <div className="dish" key={d.id}>
                        <div>
                            {d.name} - {d.price} - {d.type}
                        </div>
                        {addOrRemoveButtonGroup(d)}
                    </div>
                );
            })}
            <AddStarterComponent name={""} price={0}></AddStarterComponent>
        </>
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
        let s: StarterDish =  {...value, type: DishTypes.Starter};
        dishes.push(s);
    });
    menuData.mains.forEach((value: any) => {
        let s: MainDish =  {...value, type: DishTypes.Main};
        dishes.push(s);
    });
    menuData.desserts.forEach((value: any) => {
        let s: DessertDish =  {...value, type: DishTypes.Dessert};
        dishes.push(s);
    });

    return { dishes: dishes };
}

export { MenuComponent, makeMenuFromQuery, getMenuQuery, addStarterMutation };
