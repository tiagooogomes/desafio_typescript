import * as fs from 'fs';
import { transactionType } from '../models';
import { generateNumber } from '.';

const creatTransaction = (type: string, transaction: transactionType) => {
  const customersData: any = fs.readFileSync('transactions.json');
  const customers = JSON.parse(customersData);

  const id = generateNumber(5);
  let transactionObject = {};
  const valor = transaction.value;

  if (type === 'deposit' || 'draft') {
    transactionObject = {
      transactionId: id,
      transactiontype: type,
      value: valor,
      date: 'now',
      originAccount: transaction.account,
    };
  }

  if (type === 'transfer') {
    transactionObject = {
      transactionId: id,
      transactiontype: type,
      value: valor,
      date: 'now',
      originAccount: transaction.originAccount,
      destinationAccount: transaction.destinationAccount,
    };
  }

  customers.push(transactionObject);
  fs.writeFileSync('transactions.json', JSON.stringify(customers));

  return transactionObject;
};

export { creatTransaction };
