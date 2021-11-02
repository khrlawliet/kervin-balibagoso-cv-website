import React from 'react'
import { Balance } from './Balance';
import { IncomeExpenses } from './IncomeExpenses';
import { TransactionList } from './TransactionList';
import { AddTransaction } from './AddTransaction';
import { GlobalProvider } from './GlobalState';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
    return (
        <GlobalProvider>
            <div className="container">
                <Balance />
                    <IncomeExpenses />
                <TransactionList />
                <AddTransaction />
            </div>
        </GlobalProvider>
    )
}

export default ExpenseTracker
