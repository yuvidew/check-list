import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSelectAllChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useFetch } from '../hook/useFetch';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Header } from './Header';

interface Items {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: string;
    date_end: string;
}

export const DataListComp: React.FC = () => {
    const [products, setProducts] = useState<Items[]>([]);
    const [page, setPage] = useState<number>(1);
    const { fetchData } = useFetch();
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedCustomers, setSelectedCustomers] = useState<Items[] | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            const result = await fetchData(`https://api.artic.edu/api/v1/artworks?page=${page}`);
            setProducts(result?.data || []);
        };
        getProducts();
    }, [page, fetchData]);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
        setPage(event.page + 1);
    };

    const onSelectAllChange = async (event: DataTableSelectAllChangeEvent) => {
        if (event.checked) {
            setSelectAll(event.checked);
            setSelectedCustomers(products || []);
        } else {
            setSelectAll(event.checked);
            setSelectedCustomers([]);
        }
    };

    const onSelectionChange = (event: any) => {
        setSelectedCustomers(event.value);
    };

    const onInputSelect = (number: number) => {
        const filteredProducts = number >= products.length ? products : products.slice(0, number);
        setSelectedCustomers(filteredProducts || []);
    };

    return (
        <div className="w-[80%] mb-[3rem]">
            <DataTable 
                value={products} 
                rows={5}
                dataKey="id"
                selection={selectedCustomers} 
                onSelectionChange={onSelectionChange}
                selectAll={selectAll}
                onSelectAllChange={onSelectAllChange}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="title" header={<Header onSelect={onInputSelect} />}></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist Display"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>
            <Paginator first={first} rows={rows} totalRecords={120} onPageChange={onPageChange} />
        </div>
    );
};
