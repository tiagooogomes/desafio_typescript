// import * as fs from 'fs';
import { v4 } from 'uuid';
import { AccountsTable } from '../clients/daos/accounts';
import { accountType } from '../models';
import { generateNumber } from '../utils';

const creatAccountService = async (prop: accountType) => {
//   const customersData: any = fs.readFileSync('accounts.json');
//   const customers = JSON.parse(customersData);

  const { name } = prop;
  const { document } = prop;

  const account = {
    agencyNumber: generateNumber(4),
    accountNumber: generateNumber(6),
    accountVerificationCode: generateNumber(2),
    owner: name,
    CPF: document,
    balance: '0',
  };
  try {
    console.log('hehheehh');
    await new AccountsTable().insert({
      CPF: account.CPF,
      accountNumber: account.accountNumber,
      accountVerificationCode: account.accountVerificationCode,
      agencyNumber: account.agencyNumber,
      agencyVerificationCode: '',
      balance: account.balance,
      id: v4(),
      owner: account.owner,
    });
  } catch (error) {
    console.log('ollllaa');
    console.log(error, 'heee');
  }
  //   customers.push(account);
  //   fs.writeFileSync('accounts.json', JSON.stringify(customers));
  return account;
};

export { creatAccountService };
