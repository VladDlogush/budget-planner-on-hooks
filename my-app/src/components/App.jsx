import React, { useState } from 'react';
import Notyf from 'notyf-js';
import 'notyf-js/dist/notyf.min.css';
import styled from 'styled-components';
import shortid from 'shortid';
import BudgetForm from './BudgetForm';
import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import Values from './Values';

const notyf = new Notyf();

const Container = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  align-items: flex-start;
  grid-gap: 24px;
  max-width: 960px;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const calculateTotalExpenses = expenses => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

const calculateBalance = (budget, expenses) => budget - expenses;

const App = () => {
  const [budget, setBudget] = useState(0);

  const saveBudget = value => {
    setBudget(value);
  };

  const [expenses, setExpenses] = useState([]);

  const addExpense = ({ name, amount }) => {
    if (name === '' || amount <= 0) {
      notyf.alert('Enter a correct number or fill in all the fields');
    } else {
      const expense = {
        id: shortid.generate(),
        name,
        amount: Number(amount),
      };
      notyf.confirm('Your changes have been successfully saved!');

      setExpenses(state => [expense, ...state]);
    }
  };

  const removeExpense = id => {
    setExpenses(state => state.filter(expense => expense.id !== id));
  };

  const totalExpenses = calculateTotalExpenses(expenses);
  const balance = calculateBalance(budget, totalExpenses);

  return (
    <Container>
      <BudgetForm onSave={saveBudget} />
      <Values budget={budget} expenses={totalExpenses} balance={balance} />
      <ExpenseForm onSave={addExpense} budget={budget} balance={balance} />
      {expenses.length > 0 && (
        <ExpensesTable items={expenses} onRemove={removeExpense} />
      )}
    </Container>
  );
};

export default App;
