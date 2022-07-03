import * as fs from 'fs';
import { account } from '../models';

class CheckBalanceService {
  public accountVerification: string;
  public errors: string;

  private accountsData: any = fs.readFileSync('accounts.json');
  private customers = JSON.parse(this.accountsData);
   

  public constructor(accountVerification: account, value: string) {
      this.errors = '';
      this.accountVerification = this.validate(accountVerification, value);
  }

  private validate(accountVerification: account, value: string) {

    const accountNumber = accountVerification.account_number;
    const filter = this.customers.findIndex((account: any) => account.account_number === accountNumber);
    const valueData = parseFloat(value);

    if (!valueData) {
      this.errors += 'error: O valor é necessario | ';
    }
  
    if (valueData <= 0) {
      this.errors += 'error: O valor tem que ser positivo | ';
    }
  
    if (parseFloat(this.customers[filter].balance) < valueData) {
      this.errors += 'error: Saldo insuficiente | ';
    }

    return '';
  }
}

export { CheckBalanceService };

// const checkBalanceService = (prop: transactionType, valuee: string) => {


//   const { accountNumber } = prop;

//   const filter = customers.findIndex((account: any) => account.accountNumber === accountNumber);

//   if (!value) {
//     return 'error: O valor é necessario | ';
//   }

//   if (value <= 0) {
//     return 'error: O valor tem que ser positivo | ';
//   }

//   if (parseFloat(customers[filter].balance) < value) {
//     return 'error: Saldo insuficiente | ';
//   }

//   return valuee;
// };

// export { checkBalanceService };
