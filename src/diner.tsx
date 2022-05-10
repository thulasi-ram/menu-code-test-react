import React from 'react';
import { Diner } from './types';

export function DinersSelectComponent({
    diners,
    selectedDiner,
    setDiner,
}: {
    diners: Diner[];
    selectedDiner: any;
    setDiner: any;
}) {
    return (
        <div className="mx-auto text-center">
            <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Select Diner </h2>
            <div className="flex flex-row my-10">
                {diners.map((d) => {
                    let dinerActive = d.id === selectedDiner.id;
                    return (
                        <div
                            key={`diners-select-${d.id}`}
                            className={
                                dinerActive
                                    ? 'mx-2 px-3 py-3 relative h-12 w-64 inline-flex items-center justify-center rounded border border-gray-200 cursor-pointer hover:bg-gray-50 border-blue-500 ring-1 ring-blue-500'
                                    : 'mx-2 px-3 py-3 relative h-12 w-64 inline-flex items-center justify-center rounded border border-gray-200 cursor-pointer hover:bg-gray-50'
                            }
                            onClick={() => setDiner(d)}
                        >
                            <div className="relative flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800">
                                <svg
                                    className="h-1/2 w-1/2 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h1 1 14H20z"></path>
                                </svg>
                            </div>

                            <span className="flex-1 ml-3"> {d.name} </span>

                            <svg
                                className={
                                    dinerActive
                                        ? 'w-5 h-5 text-blue-600 opacity-100 absolute top-1 right-1'
                                        : 'w-5 h-5 text-blue-600 opacity-0 absolute top-1 right-1'
                                }
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
