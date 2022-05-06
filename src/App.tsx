import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import { TableOrder } from './table_order';

const client = new GraphQLClient({
    url: 'http://localhost:3000/graphql',
});

export default function App() {
    return (
        <ClientContext.Provider value={client}>
            <TableOrder></TableOrder>
        </ClientContext.Provider>
    );
}
