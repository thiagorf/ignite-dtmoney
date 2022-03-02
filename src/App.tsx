import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionsModal } from "./components/NewTransactionsModal";
import { TransactionsProvider } from "./hooks/useTransactions";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "freelancer de website",
          type: "deposit",
          category: "dev",
          ammount: 6000,
          createdAt: new Date("2021-02-21 09:00:00")
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "casa",
          ammount: 100,
          createdAt: new Date("2021-02-17 09:00:00")
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return this.schema.all('transaction')
    });
    
    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

Modal.setAppElement("#root");

export function App() {

  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <NewTransactionsModal 
        isOpen={isNewTransactionOpen} 
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}

