import * as fs from 'fs';
import { AccountValidator } from '../validators';
import { ExceptionTreatment } from '../utils';
import { CheckBalanceService } from '.';
import { depositType } from '../models';
import { UpdateBalance } from './update-balance';
import { CreatTransactionService } from '.';


class CreateDepositService {

    public async execute(account: depositType, transfer: boolean) {
        try {
          const accountValidated = await new AccountValidator(account.account);

          if(accountValidated.errors) {
            throw new ExceptionTreatment(accountValidated.errors);
          }

          new UpdateBalance().execute(account, 'deposit', account.value);
          
          if(!transfer) {
              const transaction = new CreatTransactionService().execute(account, 'deposit')
              return transaction;
            }
        } catch(error: any) {
            throw new ExceptionTreatment(error.message);
        } 
    }
}

export { CreateDepositService }