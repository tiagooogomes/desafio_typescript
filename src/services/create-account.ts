import * as fs from 'fs';
import { customersType } from '../models';
import { ExceptionTreatment, GenerateAccount } from '../utils';
import { CustomersValidator } from '../validators';
import { CheckUserService } from './check-user';
import { v4 } from 'uuid';

class CreatAccountService {
  private customersData: any = fs.readFileSync('customers.json');
  private accountsData: any = fs.readFileSync('accounts.json');
  private customers = JSON.parse(this.customersData);
  private accounts = JSON.parse(this.accountsData);

  public async execute(customer: customersType) {
    try {
      const customerValidated = await new CustomersValidator(customer);
      const customerExist = await new CheckUserService(customer);
      const newId = v4();

      if(customerValidated.errors) {
        throw new ExceptionTreatment(customerValidated.errors);
      }

      if(customerExist.true) {
        const newAccount = await new GenerateAccount().execute(customerExist.id, customer.password);
        this.accounts.push(newAccount);
        fs.writeFileSync('accounts.json', JSON.stringify(this.accounts));

        return newAccount;
      }

      const newAccount = await new GenerateAccount().execute(newId, customer.password);
      const newCustomer = {
        id: newId,
        birtdate: customerValidated.user.birtdate,
        email: customerValidated.user.email,
        name: customerValidated.user.name,
        CPF: customerValidated.user.CPF,
      }

      this.customers.push(newCustomer);
      this.accounts.push(newAccount);
      fs.writeFileSync('customers.json', JSON.stringify(this.customers));
      fs.writeFileSync('accounts.json', JSON.stringify(this.accounts));
      
      return newAccount;

    } catch(error: any) {
      throw new ExceptionTreatment(error.message);
    }
  }
}

//   const { name } = prop;
//   const { document } = prop;
//   const { password } = prop;

//   const account = {
//     agencyNumber: generateNumber(4),
//     accountNumber: generateNumber(6),
//     accountVerificationCode: generateNumber(2),
//     owner: name,
//     CPF: document,
//     Userpassword: password,
//     balance: '0',
//   };

//   customers.push(account);
//   fs.writeFileSync('accounts.json', JSON.stringify(customers));
//   return account;
// };

export { CreatAccountService };
