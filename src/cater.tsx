import React from 'react';
import { Dish, IOrder, Menu } from './types';

interface Props {
    menu: Menu;
}

interface State {
    order: IOrder;
}

class CaterComponent extends React.Component<Props, State> {
    render() {
        const { menu } = this.props;

        return <div>HI {JSON.stringify(menu)}</div>;
    }
}

export { CaterComponent };
