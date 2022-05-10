import { ClientContext, GraphQLClient, useQuery } from 'graphql-hooks';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './header';
import { LimitedCheeseCakeInventory } from './inventory';
import {
    addDessertDishMutation,
    addMainDishMutation,
    AddDishComponent,
    addStarterDishMutation,
    getMenuQuery,
    makeMenuFromQuery,
} from './menu';
import './style.output.css';
import { TableService } from './table_service';
import { Diner, IInventory, Menu } from './types';

const client = new GraphQLClient({
    url: 'http://localhost:3000/graphql',
});

// orchestrator to load needed dependencies
function MenuDisplay() {
    const { loading, error, data } = useQuery(getMenuQuery, {
        refetchAfterMutations: [addStarterDishMutation, addMainDishMutation, addDessertDishMutation],
    });
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
    return (
        <div className='container mx-auto'>  
            <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center mb-10"> Admin </h1>

            <AddDishComponent></AddDishComponent>
        </div>
    );
}

function NoMatch() {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-red-700 text-9xl">404</h1>

                <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                    <span className="text-red-500">Oops!</span> Page not found
                </h6>

                <p className="mb-8 text-center text-gray-500 md:text-lg">The page you’re looking for doesn’t exist.</p>
            </div>
        </div>
    );
}
export default function App() {
    return (
        <ClientContext.Provider value={client}>
            <BrowserRouter>
                <Header></Header>
                <Routes>
                    <Route path="/" caseSensitive={false} element={<MenuDisplay />} />
                    <Route path="admin" caseSensitive={false} element={<MenuAdmin />} />
                    <Route path="*" element={<NoMatch />}></Route>
                </Routes>
            </BrowserRouter>
        </ClientContext.Provider>
    );
}
