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

const BudgetForm = ({ onSave }) => {
  const [budget, setBudget] = useState('');

  const handleChange = e => {
    setBudget(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (Number(budget) >= 0) {
      onSave(Number(budget));
      notyf.confirm('Your changes have been successfully saved!');
    } else {
      notyf.alert('Enter the correct amount');
    }

    setBudget('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label customStyles={labelStyles}>
        Enter your total budget
        <Input type="number" value={budget} onChange={handleChange} />
      </Label>

      <Button label="Save" type="submit" />
    </Form>
  );
};

BudgetForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default BudgetForm;
