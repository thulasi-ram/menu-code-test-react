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
        <>
            <div> Diner Select </div>
            {diners.map((d) => {
                return (
                    <button
                        key={d.id}
                        onClick={() => setDiner(d)}
                        className={selectedDiner?.id === d.id ? 'is_active' : ''}
                    >
                        {d.name}
                    </button>
                );
            })}
        </>
    );
}
