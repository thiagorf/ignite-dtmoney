import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

interface Transaction {
	id: number;
	title: string;
	ammount: number;
	type: string;
	category: string;
	createdAt: string;
}

interface TransactionProviderProps {
    children: ReactNode;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;

}

export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TransactionsProvider ({children}: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])


	useEffect(() => {
		api.get("/transactions")
			.then(response => setTransactions(response.data.transactions));
	}, [])

    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date()
        })

        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}