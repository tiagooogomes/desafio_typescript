import * as fs from 'fs';
import { transactionType } from '../models';
// import { accountValidator } from '../validators';

const checkBalanceService = (prop: transactionType, valuee: string) => {
  const customersData: any = fs.readFileSync('accounts.json');
  const customers = JSON.parse(customersData);
  const value = parseFloat(valuee);

  const { accountNumber } = prop;

  const filter = customers.findIndex((account: any) => account.accountNumber === accountNumber);

  if (!value) {
    return 'error: O valor é necessario | ';
  }

  if (parseFloat(customers[filter].balance) < value) {
    return 'error: Saldo insuficiente | ';
  }

  return valuee;
};

export { checkBalanceService };
