import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';

test('renders home link', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/Home/i).closest('a');
    expect(linkElement).toHaveAttribute('href', '/');
});


test('renders admin link', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/admin/i).closest('a');
    expect(linkElement).toHaveAttribute('href', '/admin');
});