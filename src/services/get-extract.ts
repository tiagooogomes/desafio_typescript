import { TransactionTable } from '../clients/daos/transactions';
import { CustomersTable } from '../clients/daos/customers';
import { ExtractResponse, ExtractBody } from '../models';
import { AccountsTable } from '../clients/daos/accounts';
import { ExtractValidator } from '../validators';
import { ExceptionTreatment } from '../utils';

class GetExtractServices {

    public async execute(body: ExtractBody): Promise<ExtractResponse> {
        try {
          const accountValidated = await new ExtractValidator(body);

          if(accountValidated.errors) {
            throw new ExceptionTreatment(accountValidated.errors);
          }

          const accountBalance = await new AccountsTable().list(
            accountValidated.account.agency_number,  accountValidated.account.agency_verification_code, 
            accountValidated.account.account_verification_code,  accountValidated.account.account_number
          );

          if(accountBalance.length === 0) {
            throw new ExceptionTreatment('400: Conta não encontrada');
          }

          let account = accountBalance[0];
          const customers = await new CustomersTable().list(accountValidated.account.CPF);

          if(customers.length === 0) {
            throw new ExceptionTreatment('400: Usuário não encontrado');
          }

          const customer = customers[0];
          const transactions = await new TransactionTable().list(account.id);

          return {
            accountNumber: account.account_number,
            accountVerificationCode: account.account_verification_code,
            agencyNumber: account.agency_number,
            agencyVerificationCode: account.agency_verification_code,
            balance: account.balance,
            birthdate: customer.birtdate,
            document: customer.cpf,
            owner: customer.name,
            transactions: transactions
          }

        } catch(error: any) {
            throw new ExceptionTreatment(error.message);
        } 
    }
}

export { GetExtractServices }