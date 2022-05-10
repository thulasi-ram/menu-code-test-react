import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { DinersSelectComponent } from './diner';
import { Diner, Dish } from './types';

test('renders select diner heading', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'Diner1' },
        { id: 'DN2', name: 'Diner2' },
    ];

    render(<DinersSelectComponent diners={diners} selectedDiner={diners[0]} setDiner={mockSetDiner} />);
    const element = screen.getByText(/Select Diner/i);
    expect(element).toBeInTheDocument();

    const menuHeaderElement = element.closest('h2');
    expect(menuHeaderElement).toBeInTheDocument();
});

test('renders diners', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'TestDiner1' },
        { id: 'DN2', name: 'TestDiner2' },
    ];

    render(<DinersSelectComponent diners={diners} selectedDiner={diners[0]} setDiner={mockSetDiner} />);
    const e1 = screen.getByText(/TestDiner1/i);
    expect(e1).toBeInTheDocument();

    const e2 = screen.getByText(/TestDiner2/i);
    expect(e2).toBeInTheDocument();

    const e3 = screen.queryByText(/TestDiner3/i);
    expect(e3).toBeNull();
});

test('renders check selected check svg opacity', () => {
    const diners: Diner[] = [
        { id: 'DN1', name: 'TestDiner1' },
        { id: 'DN2', name: 'TestDiner2' },
    ];

    render(<DinersSelectComponent diners={diners} selectedDiner={diners[0]} setDiner={mockSetDiner} />);

    const dinerDivElem1 = screen.getByText(/TestDiner1/i).closest('div');
    expect(dinerDivElem1).not.toBeNull();

    const svgCheckElem1 = within(dinerDivElem1!).queryByTestId(`select-svg-${diners[0].id}`);
    expect(svgCheckElem1).toBeInTheDocument();

    // cannot check opacity due to: https://github.com/testing-library/jest-dom/issues/280
    // expect(svgCheckElem1).toHaveStyle({opacity: '1'});

    const dinerDivElem2 = screen.getByText(/TestDiner2/i).closest('div');
    expect(dinerDivElem2).not.toBeNull();

    const svgCheckElem2 = within(dinerDivElem2!).queryByTestId(`select-svg-${diners[1].id}`);
    expect(svgCheckElem2).toBeInTheDocument();
    // expect(svgCheckElem1).toHaveStyle(`opacity: 0`);
});

function mockSetDiner() {
    return (dish: Dish) => <div></div>;
}
