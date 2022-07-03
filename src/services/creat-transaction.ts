import * as fs from 'fs';
import { depositType } from '../models';
import { v4 } from 'uuid';

class CreatTransactionService {

  private transactionsData: any = fs.readFileSync('transactions.json');
  private transactions = JSON.parse(this.transactionsData);

  public async execute(account: depositType, type: string) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const transactionObject = {
      id: v4(),
      account_id: '',
      value: account.value,
      date: today.toUTCString(),
      type: type,
    };
    
    this.transactions.push(transactionObject);
    fs.writeFileSync('transactions.json', JSON.stringify(this.transactions));

    return transactionObject;
  }
}

export { CreatTransactionService };

// const creatTransaction = (type: string, transaction: transactionType) => {
//   const customersData: any = fs.readFileSync('transactions.json');
//   const customers = JSON.parse(customersData);
//   const timeElapsed = Date.now();
//   const today = new Date(timeElapsed);

//   const id = generateNumber(5);
//   let transactionObject = {};
//   const valor = transaction.value;

//   if (type === 'deposit' || 'draft') {
//     transactionObject = {
//       transactionId: id,
//       transactiontype: type,
//       value: valor,
//       date: today.toUTCString(),
//       originAccount: transaction.account,
//     };
//   }

//   if (type === 'transfer') {
//     transactionObject = {
//       transactionId: id,
//       transactiontype: type,
//       value: valor,
//       date: 'now',
//       originAccount: transaction.originAccount,
//       destinationAccount: transaction.destinationAccount,
//     };
//   }

//   customers.push(transactionObject);
//   fs.writeFileSync('transactions.json', JSON.stringify(customers));

//   return transactionObject;
// };

// export { creatTransaction };
