import { useContext } from 'react';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext';
import { Container } from "./styles";



export function Summary() {

	const {transactions} = useContext(TransactionsContext);
	

	const summary = transactions.reduce((acc, transaction) => {

		if(transaction.type === "deposit") {
			acc.deposits += transaction.ammount
			acc.total += transaction.ammount
		} else {
			acc.withdraws += transaction.ammount
			acc.total -= transaction.ammount
		}

		return acc;
		
	}, {
		deposits: 0,
		withdraws: 0,
		total: 0
	})

	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>
					{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
					}).format(summary.deposits)}
				</strong>
			</div>
			<div>
				<header>
					<p>Saidas</p>
					<img src={outcomeImg} alt="Saidas" />
				</header>
				<strong>
					- 
					{new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
						}).format(summary.withdraws)
					}
				</strong>
			</div>
			<div className='hightlight-background'>
				<header>
					<p>Total</p>
					<img src={totalImg} alt="Total" />
				</header>
				<strong>
					{
					new Intl.NumberFormat("pt-BR", {
						style: "currency",
						currency: "BRL"
					}).format(summary.total)
					}
					
				</strong>
			</div>
		</Container>
	)
}