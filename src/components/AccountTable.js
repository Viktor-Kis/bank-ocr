import {useContext} from 'react';
import { BiCheck, BiX } from 'react-icons/bi';
import DataContext from '../data/DataContext';

function AccountTable({ userStory }) {
    const { accounts } = useContext(DataContext);
    return (
        <div>
            <div className="table-container">
                <label htmlFor="tblAccount" className="form-label">Results</label>
                <table id="tblAccount" className="table">
                    <thead>
                        <tr>
                            <th scope="col">Account</th>
                            {userStory === 'us2' && <>
                                <th scope="col">Checksum</th>
                                <th scope="col">Valid</th>
                            </>}
                            {['us3', 'us4', 'us5'].includes(userStory) && <th scope="col">Status</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {accounts && accounts.length > 0 && accounts.map((account, index) => (
                            <tr key={index}>
                                <td>{account.getString()}</td>
                                {userStory === 'us2' && <>
                                    <td>{account.getChecksum()}</td>
                                    <td style={{ display: 'flex', justifyContent: 'center', fontSize: '26px' }}>
                                        {account.isValidChecksum() ? (
                                            <BiCheck style={{ color: 'limegreen' }} />
                                        ) : (
                                            <BiX style={{ color: '#FF6644' }} />
                                        )}
                                    </td>
                                </>}
                                {['us3', 'us4', 'us5'].includes(userStory) && (
                                    <td>{account.getStatus()}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AccountTable;
