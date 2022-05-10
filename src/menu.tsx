import { useMutation, useQuery } from 'graphql-hooks';
import React, { useState } from 'react';
import { DessertDish, Dish, DishTypes, MainDish, Menu, StarterDish } from './types';

const getMenuQuery = `
  query {
    menu {
      starters {
        id
        name
        price
      }
      mains {
        id
        name
        price
      }
      desserts {
        id
        name
        price
      }
    }
  }
`;

const addStarterDishMutation = `mutation AddStarter($name: String!, $price: Float!) {
    addStarter(name: $name, price: $price)
}`;

const addMainDishMutation = `mutation AddMain($name: String!, $price: Float!) {
    addMain(name: $name, price: $price)
}`;

const addDessertDishMutation = `mutation AddStarter($name: String!, $price: Float!) {
    addDessert(name: $name, price: $price)
}`;

function MenuComponent({ menu, addOrRemoveButtonGroup }: { menu: Menu; addOrRemoveButtonGroup: any }) {
    let groupedDishes = groupBy(menu.dishes, (c: Dish) => c.type);
    return (
        <section className="my-12">
            <div className=" justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white text-center">Menu</h3>
            </div>

            <div className="flow-root">
                <ul role="list" className="">
                    {Object.keys(groupedDishes).map((key: string) => {
                        let dishes: Dish[] = groupedDishes[key];
                        return (
                            <div
                                className="divide-y divide-gray-200 dark:divide-gray-700 my-8"
                                key={`menu-group-${key}`}
                            >
                                <h2 className="uppercase font-bold text-gray-500 text-xs"> {key}</h2>
                                {dishes.map((d) => {
                                    return (
                                        <li className="py-3 sm:py-4" key={`menu-item-${d.id}`}>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={`https://source.unsplash.com/random/150×150/?${d.name}`}
                                                        alt={`${d.name} image`}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {d.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400"></p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    ${d.price}
                                                </div>
                                                <div className="inline-flex w-4"></div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {addOrRemoveButtonGroup(d)}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

function AddDishComponent({}): JSX.Element {
    const [addStarter] = useMutation(addStarterDishMutation);
    const [addMain] = useMutation(addMainDishMutation);
    const [addDessert] = useMutation(addDessertDishMutation);

    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [selectedDishType, setDishType] = useState(DishTypes.Starter);

    const [formErrors, setErrors] = useState<string[]>([]);
    const [formSuccess, setSuccess] = useState<string[]>([]);

    const addDish = () => {
        let errs: string[] = [];
        setErrors(errs);
        if (newName === '') {
            errs.push('name cannot be empty');
        }

        if (newPrice <= 0) {
            errs.push('price should be greater than 0');
        }

        if (errs.length > 0) {
            setErrors(errs);
            return;
        }

        switch (selectedDishType as DishTypes) {
            case DishTypes.Starter:
                addStarter({ variables: { name: newName, price: newPrice } });
                break;
            case DishTypes.Main:
                addMain({ variables: { name: newName, price: newPrice } });
                break;
            case DishTypes.Dessert:
                addDessert({ variables: { name: newName, price: newPrice } });
                break;
            default:
                alert(`'invalid dish type selected: ${selectedDishType}'`);
                break;
        }

        setSuccess([`Created Dish: ${newName} - ${newPrice} as ${selectedDishType}`]);
    };

    return (
        <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex space-x-2 items-center justify-center">
                <fieldset>
                    <label className="relative block" htmlFor="addDish-dishName">
                        <span className="sr-only">Name</span>
                        <span className="absolute inset-y-0 left-0 flex items-center px-2 rounded-l">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-typography h-5 w-5 fill-transaparent stroke-gray-400"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="20" x2="7" y2="20" />
                                <line x1="14" y1="20" x2="21" y2="20" />
                                <line x1="6.9" y1="15" x2="13.8" y2="15" />
                                <line x1="10.2" y1="6.3" x2="16" y2="20" />
                                <polyline points="5 20 11 4 13 4 20 20" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            id="addDish-dishName"
                            name="addDish-dishName"
                            value={newName}
                            placeholder="Dish"
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <label className="relative block" htmlFor="addDish-dishPrice">
                        <span className="sr-only">Price</span>
                        <span className="absolute inset-y-0 left-0 flex items-center px-2 rounded-l">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-currency-dollar h-5 w-5 fill-transaparent stroke-gray-400"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
                                <path d="M12 3v3m0 12v3"></path>
                            </svg>
                        </span>

                        <input
                            type="number"
                            value={newPrice}
                            id="addDish-dishPrice"
                            name="addDish-dishPrice"
                            placeholder="9.9"
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <div className="w-full space-y-0.5">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-tools-kitchen-2 h-5 w-5 fill-transaparent stroke-gray-400"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3"></path>
                                </svg>
                            </div>
                            <select
                                id="icon-prefix"
                                name="icon-prefix"
                                className="block w-full truncate rounded-md border-gray-200 pl-9 pr-8 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                                onChange={(e) => {
                                    let dt = e.target.value as keyof typeof DishTypes;
                                    setDishType(DishTypes[dt]);
                                }}
                            >
                                <option>Starter</option>
                                <option>Main</option>
                                <option>Dessert</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <button
                    className="relative rounded  inline-block text-sm font-medium text-red-600 group active:text-red-500 focus:outline-none focus:ring hover:text-white hover:bg-red-600"
                    type="submit"
                    onClick={addDish}
                >
                    <span className="relative block px-8 py-2 border border-current rounded shadow-sm">Add</span>
                </button>
            </div>
            <div className="flex space-x-2 items-center justify-center my-10">
                {formErrors.length > 0 && (
                    <div className="p-4 text-red-700 border rounded border-red-900/10 bg-red-50 w-1/2" role="alert">
                        <strong className="text-sm font-medium"> There are some errors creating the dish</strong>

                        <ul className="mt-1 ml-2 text-xs list-disc list-inside">
                            {formErrors.map((err, idx) => (
                                <li key={`${idx}-err`}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {formSuccess.length > 0 && (
                    <div
                        className="p-4 text-red-700 border rounded border-green-900/10 bg-green-50 w-1/2"
                        role="success"
                    >
                        <ul className="mt-1 ml-2 text-xs list-disc list-inside">
                            {formSuccess.map((msg, idx) => (
                                <li key={`${idx}-msg`}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </form>
    );
}
function makeMenuFromQuery(data: any): Menu {
    let dishes: Dish[] = [];
    let menuData = data.menu;

    menuData.starters.forEach((value: any) => {
        let s: StarterDish = { ...value, type: DishTypes.Starter };
        dishes.push(s);
    });
    menuData.mains.forEach((value: any) => {
        let s: MainDish = { ...value, type: DishTypes.Main };
        dishes.push(s);
    });
    menuData.desserts.forEach((value: any) => {
        let s: DessertDish = { ...value, type: DishTypes.Dessert };
        dishes.push(s);
    });

    return { dishes: dishes };
}

function groupBy(xs: any, f: any) {
    return xs.reduce((r: any, v: any, i: any, a: any, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

export {
    MenuComponent,
    makeMenuFromQuery,
    getMenuQuery,
    addStarterDishMutation,
    addMainDishMutation,
    addDessertDishMutation,
    AddDishComponent,
};
