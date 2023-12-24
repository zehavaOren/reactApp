import react, { useEffect, useState } from 'react'
import { UserTable } from './UserTable';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { logMessage } from '../logger';

export const UserData = () => {
    const [users, setUsers] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
    ];

    //get all users
    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
            logMessage('info', 'This users getted');
        } 
        catch (error) {
            console.error('Error fetching data:', error.message);
            logMessage('error', `Error fetching users:, ${error.message}`);
            setErrorMessage('Warning Message: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    };

    //the component start rendering here
    useEffect(() => {
        getData();
    }, [])


    return (
        <><div className="user-table-container">
            {loading && (
                <div className="overlay">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                </div>
            )}
            {errorMessage && <Message severity="warn" text={errorMessage} />}
            <UserTable users={users} columns={columns} />
        </div>
        </>
    )
}