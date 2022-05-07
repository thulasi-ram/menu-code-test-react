import React, { useReducer, useState } from 'react';
import { DinersSelectComponent } from './diner';
import { MenuComponent } from './menu';
import { Diner, Dish, IInventory, IOrder, Menu, Order } from './types';

enum AlterOrderAction {
    ADD = 'add',
    REM = 'remove',
}

export function TableOrder({ menu, diners, inventory }: { menu: Menu; diners: Diner[]; inventory: IInventory }) {
    const [selectedDiner, setDiner] = useState<Diner>(diners[0]);

    const [orderState, setOrderState] = useReducer(addOrRemoveFromOrder, {
        order: new Order(),
        diner: selectedDiner,
        inventory: inventory,
    });

    return (
        <>
            <DinersSelectComponent
                diners={diners}
                selectedDiner={selectedDiner}
                setDiner={setDiner}
            ></DinersSelectComponent>
            <MenuComponent
                menu={menu}
                addOrRemoveDishComponent={addOrRemoveDishComponent(
                    orderState.order,
                    selectedDiner,
                    inventory,
                    setOrderState
                )}
            ></MenuComponent>
            <p>-</p>
            <OrderSummaryComponent order={orderState.order}></OrderSummaryComponent>
        </>
    );
}

// function must always be outside
// https://stackoverflow.com/a/54894698/6323666
function addOrRemoveFromOrder(
    state: { order: IOrder; diner: Diner, inventory: IInventory },
    payload: { dish: Dish; action: AlterOrderAction}
) {
    switch (payload.action) {
        case AlterOrderAction.ADD: {
            state.order.addItem(state.diner, payload.dish);
            state.inventory.depleteItem(payload.dish);
            break;
        }
        case AlterOrderAction.REM: {
            state.order.removeItem(state.diner, payload.dish);
            state.inventory.stockItem(payload.dish);
            break;
        }
    }

    return { order: state.order, diner: state.diner, inventory: state.inventory };
}

const addOrRemoveDishComponent = (order: IOrder, diner: Diner, inventory: IInventory, addOrRemoveCallback: any) => {
    return (dish: Dish) => {
        const stockAvailable = inventory.has(dish);
        const orderAvailable = order.dinerDishQuantity(diner, dish);
        return (
            <div className="addOrRemoveDish">
                <button
                    onClick={() => addOrRemoveCallback({ dish: dish, action: AlterOrderAction.REM })}
                    disabled={orderAvailable < 1}
                >
                    remove
                </button>

                <div>quantity: {orderAvailable}</div>

                <button
                    onClick={() => addOrRemoveCallback({ dish: dish, action: AlterOrderAction.ADD })}
                    disabled={!stockAvailable}
                >
                    add
                </button>
            </div>
        );
    };
};

function OrderSummaryComponent({ order }: { order: IOrder }) {
    return (
        <>
            <div>Order Summary</div>
            {order.amount()}
        </>
    );
}
