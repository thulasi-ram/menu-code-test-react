import React, { useState } from 'react';
import { DinersSelectComponent } from './diner';
import { MenuComponent } from './menu';
import { Diner, Dish, IOrder, Order } from './types';

export function TableOrder() {
    let diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const [selectedDiner, setDiner] = useState<Diner | undefined>(undefined);
    const [selectedDish, setDish] = useState<Dish | undefined>(undefined);
    const order: IOrder = new Order()

    const addToOrder = () => {
        if (selectedDiner == undefined) {
            alert("Select Diner");
            return
        }

        if (selectedDish == undefined) {
            alert("Select Dish");
        }

        order.addItem(selectedDiner!, selectedDish!);
        alert(`${selectedDiner?.name} - ${selectedDish?.name}`);
    }

    return (
        <>
            <DinersSelectComponent diners={diners} selectedDiner={selectedDiner} setDiner={setDiner} ></DinersSelectComponent>
            <MenuComponent selectedDish={selectedDish} setDish={setDish}></MenuComponent>
            <p>-</p>
            <button onClick={addToOrder}>Add to Order</button>
        </>
    );
}
