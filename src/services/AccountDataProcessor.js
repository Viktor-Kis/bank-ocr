import { useContext, useEffect } from 'react';
import DataContext from '../data/DataContext';
import createOCR from "./OCRFactory";
import Account from "../Account";

function AccountDataProcessor({ userStory }) {
    const { content, setAccounts } = useContext(DataContext);

    useEffect(() => {
        processAccounts();
    }, [content, userStory]);

    const processAccounts = () => {
        try {
            const processedAccounts = parseAccounts(content, userStory);
            setAccounts(processedAccounts);
        } catch (error) {
            console.error('Error processing accounts:', error);
            // TODO: Global error handler with UI components
        }
    }

    const parseAccounts = (content, userStory) => {
        const lines = content.split('\n');
        lines.pop();
        const accounts = [];

        while (lines.length > 0) {
            let accountLine = lines.splice(0, 3);
            const hexaMode = userStory === 'us5';
            const options = {
                lines: accountLine,
                autoRepair: userStory === 'us4' || userStory === 'us5',
                ocr: createOCR(hexaMode)
            };
            accounts.push(new Account(options));
            lines.splice(0, 1);
        }
        return accounts;
    };

    return null;
}

export default AccountDataProcessor;
