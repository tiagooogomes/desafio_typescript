import * as fs from 'fs';
import { transactionType } from '../models';

const addRemoveService = (deposit: transactionType, type: string, valuee: string) => {
  const customersData: any = fs.readFileSync('accounts.json');
  const customers = JSON.parse(customersData);

  const { accountNumber } = deposit;

  const value = parseFloat(valuee);

  const filter = customers.findIndex((account: any) => account.accountNumber === accountNumber);

  const saldo = parseFloat(customers[filter].balance);

  if (type === 'deposit') {
    customers[filter].balance = (saldo + value).toString();
  }
  if (type === 'daft') {
    customers[filter].balance = (saldo - value).toString();
  }
  fs.writeFileSync('accounts.json', JSON.stringify(customers));
};
export { addRemoveService };
