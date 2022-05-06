import { useMutation, useQuery } from 'graphql-hooks';
import React, { useState } from 'react';
import { DessertDish, Dish, MainDish, Menu, StarterDish } from './types';

export const getMenuQuery = `
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

export function MenuComponent() {
    const { loading, error, data, refetch } = useQuery(getMenuQuery, {refetchAfterMutations: [addStarterMutation]});

    if (loading) return <p>Loading menu from graphql...</p>;
    if (error) return <p>Error loading menu from graphql!</p>;

    let menu: Menu = makeMenuFromQuery(data);

    return (
        <>
            <div>HI {JSON.stringify(menu)}</div>
            <AddStarterComponent name={""} price={0}></AddStarterComponent>
        </>
    );
}

function AddStarterComponent({name, price}: {name: string, price: number}): JSX.Element {
    const [updateStarter] = useMutation(addStarterMutation);
    const [newName, setNewName] = useState(name);
    const [newPrice, setNewPrice] = useState(price);

    console.log(name, price);

    return (
        <div>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input type="number" value={newPrice} onChange={(e) => setNewPrice(parseFloat(e.target.value))} />
            <button onClick={() => updateStarter({ variables: { name: newName, price: newPrice } })}>Add Starter</button>
        </div>
    );
}

function makeMenuFromQuery(data: any): Menu {
    let dishes: Dish[] = [];
    let menuData = data.menu;

    menuData.starters.forEach((value: any) => {
        let s: StarterDish = value;
        dishes.push(s);
    });
    menuData.mains.forEach((value: any) => {
        let s: MainDish = value;
        dishes.push(s);
    });
    menuData.desserts.forEach((value: any) => {
        let s: DessertDish = value;
        dishes.push(s);
    });

    return { dishes: dishes };
}
