import React, { useContext } from 'react';
import { GlobalContext } from './GlobalState';
import {Transaction} from './Transaction';
export const TransactionList = () => {
    const { transactions } = useContext(GlobalContext);


    return (
        <>
            <h5>History</h5>
            <ul className="list">
                {transactions.map(transaction => (<Transaction key={transaction.id}transaction ={transaction}/>)
                )}

            </ul>
        </>
    )
}
