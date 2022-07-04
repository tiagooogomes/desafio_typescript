import { TransactionTable } from '../clients/daos/transactions';
import { CustomersTable } from '../clients/daos/customers';
import { AccountsTable } from '../clients/daos/accounts';
import { DraftBody, DraftResponse } from '../models';
import { DraftValidator } from '../validators';
import { ExceptionTreatment } from '../utils';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

class CreateDraftService {

    public async execute(body: DraftBody): Promise<DraftResponse> {
        try {
          const accountValidated = await new DraftValidator(body);

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

          if(!(await bcrypt.compare(accountValidated.account.account.password, account.password))) {
            throw new ExceptionTreatment('Senha incoerente');
          };

          const customers = await new CustomersTable().list(accountValidated.account.account.CPF);

          if(customers.length === 0) {
            throw new ExceptionTreatment('Usuário não encontrado');
          };

          if(account.balance < accountValidated.account.value + 4) {
            throw new ExceptionTreatment('Você está pobre');
          };

          const customer = customers[0];
          const draftTransaction = await new TransactionTable().insert({
            account_destiny_id: null,
            account_origin_id: account.id,
            date: new Date(),
            id: v4(),
            type: 'Draft',
            value: accountValidated.account.value
          });

          const rateTransaction = await new TransactionTable().insert({
            account_destiny_id: null,
            account_origin_id: account.id,
            date: new Date(),
            id: v4(),
            type: 'Draft Rate',
            value: 4
          });

          account = await new AccountsTable().update(
            Number(account.balance) - Number(accountValidated.account.value) - 4, 
            account.id
          );

          return {
            transactionId: draftTransaction.id,
            date: draftTransaction.date,
            type: draftTransaction.type,
            value: draftTransaction.value,
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

export { CreateDraftService };