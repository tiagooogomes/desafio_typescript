import * as fs from 'fs';
import { transactionType } from '../models';

const addRemoveService = (deposit: transactionType, type: string, valuee: string) => {
  const customersData: any = fs.readFileSync('accounts.json');
  const customers = JSON.parse(customersData);

  //   const { verificationCode } = deposit.originAccount;
  //   const { accountNumber } = deposit.originAccount;
  //   const { document } = deposit.originAccount;

  const { agencyNumber } = deposit;

  const value = parseFloat(valuee);
  console.log(deposit, ' ola');

  const filter = customers.findIndex((account: any) => account.agencyNumber === agencyNumber);

  //    && account.accountNumber === accountNumber
  //    && account.verificationCode === verificationCode
  //    && account.document === document);
  //  console.log(filter);
  //   console.log(deposit);
  //   console.log('olaa');

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