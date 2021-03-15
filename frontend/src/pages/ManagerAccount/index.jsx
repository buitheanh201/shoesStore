import React, { useEffect, useState } from 'react';
import Table from './components/table';
import AuthAPI from './../../services/authApi';

function ManagerAccount() {

    const [accounts,setAccounts] = useState([]);

    useEffect(() => {
        const findAll = async() => {
            const { data : accounts } = await AuthAPI.findAll();
            setAccounts(accounts);
        }
        findAll()
    },[]);

    return (
        <div className ='p-4 pt-7'>
           <Table 
                accounts = {accounts.length > 0 ? accounts : []}
           />
        </div>
    );
}

export default ManagerAccount;