import { UpdateBalance } from './update-balance';
import { AccountValidator } from '../validators';
import { ExceptionTreatment } from '../utils';
import { CreatTransactionService } from '.';
import { CheckBalanceService } from '.';
import { draftType } from '../models';


class CreateDraftService {

    public async execute(account: draftType, transfer: boolean) {
        try {
          const accountValidated = await new AccountValidator(account.account);
          const balanceChecked = await new CheckBalanceService(account.account, account.value);

          if(accountValidated.errors) {
            throw new ExceptionTreatment(accountValidated.errors);
          }

          if(balanceChecked.errors) {
            throw new ExceptionTreatment(balanceChecked.errors);
          }
          new UpdateBalance().execute(account, 'draft', account.value);

          if(!transfer) {
              const transaction = new CreatTransactionService().execute(account, 'draft');
              return transaction;
           }

        } catch(error: any) {
            throw new ExceptionTreatment(error.message);
        } 
    }
}

export { CreateDraftService }