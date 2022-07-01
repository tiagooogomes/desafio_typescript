import * as fs from 'fs';
import { accountType } from '../models';
import { generateNumber } from '../utils';

const creatAccountService = (prop: accountType) => {
  const customersData: any = fs.readFileSync('accounts.json');
  const customers = JSON.parse(customersData);

  const { name } = prop;
  const { document } = prop;
  const { password } = prop;

  const account = {
    agencyNumber: generateNumber(4),
    accountNumber: generateNumber(6),
    accountVerificationCode: generateNumber(2),
    owner: name,
    CPF: document,
    Userpassword: password,
    balance: '0',
  };

  customers.push(account);
  fs.writeFileSync('accounts.json', JSON.stringify(customers));
  return account;
};

export { creatAccountService };
