import react, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PostsData } from './PostsData';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';


export const UserTable = (props) => {
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    //update the selected user
    const handleSelectionChange = (e) => {
        const newUser = e.value && e.value.id ? e.value : null;
        setSelectedUser(newUser);
    };
    //update and search -global filter
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    //add the global filter to the header
    const renderHeader = () => {
        return (
            <div className="flex align-items-center" id='searchBox'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                </span>
                <div className="flex-column">
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </div>
            </div>
        );
    };
    const header = renderHeader();
    return (
        <><h1>User Table</h1>
            <div>
                <DataTable
                    value={props.users}
                    tableStyle={{ width: '50%' }}
                    stripedRows
                    selectionMode="single"
                    onSelectionChange={(e) => handleSelectionChange(e)}
                    dataKey="id"
                    filters={filters}
                    globalFilterFields={['name', 'email']} header={header} emptyMessage="No customers found.">
                    {props.columns.map((column) => (
                        <Column
                            key={column.field}
                            field={column.field}
                            header={column.header}
                            filter={column.field === 'name' || column.field === 'email'}
                            filterPlaceholder="Search"
                        ></Column>
                    ))}
                    <Column
                        field="company.name" // Specify the path to the nested property
                        header="Company Name"
                    />
                </DataTable>
                <div className="postsList">
                    {selectedUser && <PostsData userId={selectedUser.id} onUserDeselected={() => setSelectedUser(null)} />}
                </div>
            </div>
        </>

    )
}