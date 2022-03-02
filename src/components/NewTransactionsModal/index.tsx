import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useContext, useState } from 'react';
import { TransactionsContext } from '../../TransactionsContext';

type NewTransactionsModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionsModal({isOpen, onRequestClose}: NewTransactionsModalProps) {

    const {createTransaction} = useContext(TransactionsContext);

    const [title, setTitle] = useState("");
    const [ammount, setAmmount] = useState(0);
    const [category, setCategory] = useState("");

    const [type, setType] = useState("deposit");


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        

        await createTransaction({
            title,
            ammount,
            category,
            type
        })

        setTitle("");
        setAmmount(0);
        setCategory("")
        setType("deposit");
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
        <button 
            type='button' 
            onClick={onRequestClose}
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar transação</h2>

            <input 
                type="text"  
                placeholder="titulo"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input 
                type="number" 
                placeholder="valor"
                value={ammount}
                onChange={event => setAmmount(Number(event.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox
                    type="button"
                    onClick={() => setType("deposit")}
                    isActive={type === "deposit"}
                    activeColor="green"
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox
                    type="button"
                    onClick={() => {setType("withdraw")}}
                    isActive={type === "withdraw"}
                    activeColor="red"
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saida</span>
                </RadioBox>
            </TransactionTypeContainer>
            <input 
                placeholder="Categoria" 
                value={category}
                onChange={(event) => setCategory(event.target.value) }
            />

            <button type="submit">
                Cadastrar
            </button>
        </Container>
        

        </Modal>
    )
} 