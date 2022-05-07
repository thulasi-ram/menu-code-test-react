import React, { useState, useEffect, useReducer } from 'react';
import { DinersSelectComponent } from './diner';
import { MenuComponent } from './menu';
import { Diner, Dish, IOrder, Order } from './types';

enum AlterOrderAction {
    ADD = 'add',
    REM = 'remove',
}

export function TableOrder() {
    let diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    const [selectedDiner, setDiner] = useState<Diner>(diners[0]);
    const [orderState, setOrderState] = useReducer(addOrRemoveFromOrder, { order: new Order(), diner: selectedDiner });

    return (
        <>
            <DinersSelectComponent
                diners={diners}
                selectedDiner={selectedDiner}
                setDiner={setDiner}
            ></DinersSelectComponent>
            <MenuComponent
                addOrRemoveDishComponent={addOrRemoveDishComponent(orderState.order, selectedDiner, setOrderState)}
            ></MenuComponent>
            <p>-</p>
            <OrderSummaryComponent order={orderState.order}></OrderSummaryComponent>
        </>
    );
}

// function must always be outside
// https://stackoverflow.com/a/54894698/6323666
function addOrRemoveFromOrder(
    state: { order: IOrder; diner: Diner },
    payload: { dish: Dish; action: AlterOrderAction }
) {
    console.log('action', state, payload);
    switch (payload.action) {
        case AlterOrderAction.ADD: {
            state.order.addItem(state.diner, payload.dish);
            break;
        }
        case AlterOrderAction.REM: {
            state.order.removeItem(state.diner, payload.dish);
            break;
        }
    }
    return { order: state.order, diner: state.diner };
}

const addOrRemoveDishComponent = (order: IOrder, diner: Diner | undefined, addOrRemoveCallback: any) => {
    return (dish: Dish) => (
        <div className="addOrRemoveDish">
            <button onClick={() => addOrRemoveCallback({ dish: dish, action: AlterOrderAction.REM })}>remove</button>
            <div>quantity: {order.dinerDishQuantity(diner, dish)}</div>
            <button onClick={() => addOrRemoveCallback({ dish: dish, action: AlterOrderAction.ADD })}>add</button>
        </div>
    );
};

function OrderSummaryComponent({ order }: { order: IOrder }) {
    return (
        <>
            <div>Order Summary</div>
            {order.amount()}
        </>
    );
}
