import { TransactionTable } from '../clients/daos/transactions';
import { CustomersTable } from '../clients/daos/customers';
import { DepositBody, DepositResponse } from '../models';
import { AccountsTable } from '../clients/daos/accounts';
import { DepositValidator } from '../validators';
import { ExceptionTreatment } from '../utils';
import { v4 } from 'uuid';

class CreateDepositService {

    public async execute(body: DepositBody): Promise<DepositResponse> {
        try {
          const accountValidated = await new DepositValidator(body);

          if(accountValidated.errors) {
            throw new ExceptionTreatment(accountValidated.errors);
          };
          const accountBalance = await new AccountsTable().list(
            accountValidated.account.account.agency_number,  accountValidated.account.account.agency_verification_code, 
            accountValidated.account.account.account_verification_code,  accountValidated.account.account.account_number
          );

          if(accountBalance.length === 0) {
            throw new ExceptionTreatment('Conta não encontrada');
          };

          let account = accountBalance[0];
          const customers = await new CustomersTable().list(accountValidated.account.account.CPF);

          if(customers.length === 0) {
            throw new ExceptionTreatment('Usuário não encontrado');
          };

          const customer = customers[0];
          const depositTransaction = await new TransactionTable().insert({
            account_destiny_id: account.id,
            account_origin_id: null,
            date: new Date(),
            id: v4(),
            type: 'Deposit',
            value: accountValidated.account.value * 0.99
          });

          const rateTransaction = await new TransactionTable().insert({
            account_destiny_id: null,
            account_origin_id: account.id,
            date: new Date(),
            id: v4(),
            type: 'Deposit Rate',
            value: accountValidated.account.value * 0.01
          });

          account = await new AccountsTable().update(
            Number(account.balance) + Number(accountValidated.account.value) * 0.99, 
            account.id
          );

          return {
            transactionId: depositTransaction.id,
            date: depositTransaction.date,
            type: depositTransaction.type,
            value: depositTransaction.value,
            account: {
              accountNumber: account.account_number,
              accountVerificationCode: account.account_verification_code,
              agencyNumber: account.agency_number,
              agencyVerificationCode: account.agency_verification_code,
              document: customer.cpf,
              owner: customer.name
            }
          };

        } catch(error: any) {
          throw new ExceptionTreatment(error.message);
        }; 
    };
};

export { CreateDepositService };