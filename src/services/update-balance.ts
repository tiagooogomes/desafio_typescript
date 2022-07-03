import * as fs from 'fs';
import { depositType } from '../models';

// class UpdateBalance {
//   private fees = {
//     deposit: 0.01,
//     draft: 4,
//     transfer: 1,
//   };

// }

class UpdateBalance {

  private accountsData: any = fs.readFileSync('accounts.json');
  private accounts = JSON.parse(this.accountsData);
   
  public async execute(account: depositType, type: string, value: string) { 

    const valueData = parseFloat(value);
    const accountNumber = account.account.account_number;

    const filter = this.accounts.findIndex((account: any) => account.account_number === accountNumber);
    const balance = parseFloat(this.accounts[filter].balance);

    if(type === 'deposit') {
      this.accounts[filter].balance = (balance + (valueData - (valueData * 0.01))).toString();
    }

    if(type === 'draft') {
      this.accounts[filter].balance = (balance - (valueData - 4)).toString();
    }

    fs.writeFileSync('accounts.json', JSON.stringify(this.accounts));
  }
}

export { UpdateBalance };
