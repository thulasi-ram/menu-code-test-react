import { ClientContext, GraphQLClient, useQuery } from 'graphql-hooks';
import React from 'react';
import { TableOrder } from './table_order';
import './style.css';
import { addStarterMutation, getMenuQuery, makeMenuFromQuery } from './menu';
import { Diner, IInventory, Menu } from './types';
import { LimitedCheeseCakeInventory } from './inventory';

const client = new GraphQLClient({
    url: 'http://localhost:3000/graphql',
});

function Container() {

    const { loading, error, data } = useQuery(getMenuQuery, { refetchAfterMutations: [addStarterMutation] });
    if (loading) return <p>Loading menu from graphql...</p>;
    if (error) return <p>Error loading menu from graphql!</p>;
    const menu: Menu = makeMenuFromQuery(data);
    const inventory: IInventory = new LimitedCheeseCakeInventory(menu.dishes);

    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];
    
    return <TableOrder menu={menu} diners={diners} inventory={inventory}></TableOrder>;
}

export default function App() {
    return (
        <ClientContext.Provider value={client}>
            <Container></Container>
        </ClientContext.Provider>
    );
}
