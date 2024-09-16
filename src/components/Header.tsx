import React, { FormEvent, useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface props {
    onSelect : (newValue: any) => void;
}

export const Header: React.FC<props> = ({
    onSelect
}) => {
    const op = useRef<OverlayPanel>(null);
    const [value , setValue] = useState("")

    const onSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSelect(Number(value))
    }

    return (
        <div className="flex">
            <Button
                type="button"
                icon="pi pi-angle-down"
                label="Title"
                onClick={(e) => op.current?.toggle(e)}
            />
            <OverlayPanel ref={op}>
                <form className="flex items-center gap-1" onSubmit={onSubmit}>
                    <InputText 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                        placeholder='Select rows...'
                        className='px-3 py-1 border'
                    />
                    <Button type='submit' className='bg-blue-500 px-3 py-1 text-white'>
                        Submit
                    </Button>
                </form>
            </OverlayPanel>
        </div>
    );
};
