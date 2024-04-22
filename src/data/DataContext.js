import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [content, setContent] = useState('');
    const [accounts, setAccounts] = useState([]);

    return (
        <DataContext.Provider value={{ content, setContent, accounts, setAccounts}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
