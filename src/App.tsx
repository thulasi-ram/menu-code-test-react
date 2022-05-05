import React from 'react';
import { GraphQLClient, ClientContext, useQuery } from 'graphql-hooks';
import { CaterComponent } from './cater';
import { DessertDish, Dish, MainDish, Menu, StarterDish } from './types';

const client = new GraphQLClient({
    url: 'http://localhost:3000/graphql',
});

export const dishesQuery = `
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

function Container() {
    const { loading, error, data, refetch } = useQuery(dishesQuery);

    if (loading) return <p>Loading menu from graphql...</p>;
    if (error) return <p>Error loading menu from graphql!</p>;

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
    
    let menu: Menu = {"dishes": dishes }

    return (
        <>
            <CaterComponent menu={menu}></CaterComponent>
        </>
    );
}

export default function App() {
    return (
        <ClientContext.Provider value={client}>
            <Container></Container>
        </ClientContext.Provider>
    );
}
