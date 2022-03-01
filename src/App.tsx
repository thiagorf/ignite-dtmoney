import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer } from "miragejs";
import Modal from "react-modal";
import { useState } from "react";

createServer({
  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          ammount: 400,
          type: 'deposit',
          category: 'food',
          createdAt: new Date()
        }
      ]
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
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />

      <Modal
        isOpen={isNewTransactionOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Nova transação</h2>
      </Modal>
      <GlobalStyle />
    </>
  );
}

