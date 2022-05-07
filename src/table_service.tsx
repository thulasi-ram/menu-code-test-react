import React, { useReducer, useState } from 'react';
import { DinersSelectComponent } from './diner';
import { MenuComponent } from './menu';
import { Order, OrderSummaryComponent } from './order';
import { Diner, Dish, IInventory, IOrder, Menu } from './types';

enum AlterOrderAction {
    ADD = 'add',
    REM = 'remove',
}

export function TableService({ menu, diners, inventory }: { menu: Menu; diners: Diner[]; inventory: IInventory }) {
    const [selectedDiner, setDiner] = useState<Diner>(diners[0]);

    const [orderState, setOrderState] = useReducer(addOrRemoveFromOrder, {
        order: new Order(diners),
        inventory: inventory,
    });

    const addOrRemoveButtonGroup = addOrRemoveDishComponent(orderState.order, selectedDiner, inventory, setOrderState);

    return (
        <>
            <DinersSelectComponent
                diners={diners}
                selectedDiner={selectedDiner}
                setDiner={setDiner}
            ></DinersSelectComponent>
            <MenuComponent menu={menu} addOrRemoveButtonGroup={addOrRemoveButtonGroup}></MenuComponent>
            <OrderSummaryComponent order={orderState.order}></OrderSummaryComponent>
        </>
    );
}

// function must always be outside
// https://stackoverflow.com/a/54894698/6323666
function addOrRemoveFromOrder(
    state: { order: IOrder; inventory: IInventory },
    payload: { diner: Diner; dish: Dish; action: AlterOrderAction }
) {
    switch (payload.action) {
        case AlterOrderAction.ADD: {
            state.order.addItem(payload.diner, payload.dish);
            state.inventory.depleteItem(payload.dish);
            break;
        }
        case AlterOrderAction.REM: {
            state.order.removeItem(payload.diner, payload.dish);
            state.inventory.stockItem(payload.dish);
            break;
        }
    }

    return { order: state.order, inventory: state.inventory };
}

// Embeddable button group in each dish
const addOrRemoveDishComponent = (order: IOrder, diner: Diner, inventory: IInventory, addOrRemoveCallback: any) => {
    return (dish: Dish) => {
        const stockAvailable = inventory.has(dish);
        const orderAvailable = order.dishesAndQuantities(diner).get(dish) || 0;
        return (
            <div className="addOrRemoveDish">
                <button
                    onClick={() => addOrRemoveCallback({ diner: diner, dish: dish, action: AlterOrderAction.REM })}
                    disabled={orderAvailable < 1}
                >
                    remove
                </button>

                <div>quantity: {orderAvailable}</div>

                <button
                    onClick={() => addOrRemoveCallback({ diner: diner, dish: dish, action: AlterOrderAction.ADD })}
                    disabled={!stockAvailable}
                >
                    add
                </button>
            </div>
        );
    };
};
