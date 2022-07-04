import { ExceptionTreatment, GenerateAccount } from '../utils';
import { CustomersTable } from '../clients/daos/customers';
import { AccountsTable } from '../clients/daos/accounts';
import { AccountBody, AccountResponse } from '../models';
import { CustomersValidator } from '../validators';
import { CheckUserService } from './check-user';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

class CreatAccountService {

  public async execute(body: AccountBody): Promise<AccountResponse> {
    try {
      const customerValidated = await new CustomersValidator(body);
      let customer = await new CheckUserService().execute(body.CPF);

      if(customerValidated.errors) {
        throw new ExceptionTreatment(customerValidated.errors);
      };

      if(!customer) {
        customer = await new CustomersTable().insert({
          birtdate: new Date(customerValidated.user.birtdate || ''),
          cpf: customerValidated.user.CPF || '',
          email: customerValidated.user.email || '',
          id: v4(),
          name: customerValidated.user.name || '',
        });
      };

      const newAccount = await new GenerateAccount().execute(customer.id, customerValidated.user.password || '');
      const account = await new AccountsTable().insert({
        agency_verification_code: newAccount.agency_verification_code,
        account_verification_code: newAccount.account_verification_code,
        account_number: newAccount.account_number,
        agency_number: newAccount.agency_number,
        password: await bcrypt.hash(newAccount.password, 10),
        balance: newAccount.balance,
        user_id: newAccount.user_id,
        id: newAccount.id
      });
      return {
        agencyVerificationCode: account.agency_verification_code,
        accountVerificationCode: account.account_verification_code,
        accountNumber: account.account_number,
        agencyNumber: account.agency_number,
        birthdate: customer.birtdate,
        document: customer.cpf,
        owner: customer.name
      };

    } catch(error: any) {
      throw new ExceptionTreatment(error.message);
    };
  };
};

export { CreatAccountService };
