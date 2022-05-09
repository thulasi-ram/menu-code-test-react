import { ClientContext, GraphQLClient, useQuery } from 'graphql-hooks';
import React from 'react';
import { TableService } from './table_service';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './style.css';
import { AddStarterComponent, addStarterMutation, getMenuQuery, makeMenuFromQuery } from './menu';
import { Diner, IInventory, Menu } from './types';
import { LimitedCheeseCakeInventory } from './inventory';

const client = new GraphQLClient({
    url: 'http://localhost:3000/graphql',
});

// orchestrator to load needed dependencies
function MenuDisplay() {
    const { loading, error, data } = useQuery(getMenuQuery, { refetchAfterMutations: [addStarterMutation] });
    if (loading) return <p>Loading menu from graphql...</p>;
    if (error) return <p>Error loading menu from graphql!</p>;
    const menu: Menu = makeMenuFromQuery(data);
    const inventory: IInventory = new LimitedCheeseCakeInventory(menu.dishes);

    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    return <TableService menu={menu} diners={diners} inventory={inventory}></TableService>;
}

function MenuAdmin() {
    return <>
            <AddStarterComponent name={""} price={0}></AddStarterComponent>
    </>;
}
export default function App() {
    return (
        <ClientContext.Provider value={client}>
            <BrowserRouter>
                    <Link to="/">Home</Link>
                    <Link to="admin">Admin</Link>
                    <Routes>
                        <Route path="/" caseSensitive={false} element={<MenuDisplay />} />
                        <Route path="admin" caseSensitive={false} element={<MenuAdmin />} />
                    </Routes>
            </BrowserRouter>
        </ClientContext.Provider>
    );
}
