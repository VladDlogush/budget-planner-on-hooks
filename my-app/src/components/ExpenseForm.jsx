import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notyf from 'notyf-js';
import 'notyf-js/dist/notyf.min.css';
import Form from './shared/Form';
import Label from './shared/Label';
import Input from './shared/Input';
import Button from './shared/Button';

const notyf = new Notyf();

const labelStyles = `
  margin-bottom: 16px;  
`;

const ExpenseForm = ({ onSave, budget, balance }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeAmount = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!budget || balance < amount) {
      notyf.warn(
        'Operation is not possible. Your budget is $ 0 or your spending outweighs the balance',
      );

      setName('');
      setAmount('');
      return;
    }

    onSave({ name, amount });
    setName('');
    setAmount('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label customStyles={labelStyles}>
        Enter expense name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
        />
      </Label>
      <Label customStyles={labelStyles}>
        Enter expense amount
        <Input
          type="number"
          name="amount"
          value={amount}
          onChange={handleChangeAmount}
        />
      </Label>

      <Button label="Add" type="submit" />
    </Form>
  );
};

ExpenseForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  budget: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default ExpenseForm;
