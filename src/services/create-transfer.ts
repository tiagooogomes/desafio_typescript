import { TransactionTable } from '../clients/daos/transactions';
import { TransferBody, TransferResponse } from '../models';
import { CustomersTable } from '../clients/daos/customers';
import { AccountsTable } from '../clients/daos/accounts';
import { TransferValidator } from '../validators';
import { ExceptionTreatment } from '../utils';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

class CreateTransferServices {

    public async execute(body: TransferBody): Promise<TransferResponse> {
        try {
            const accountValidated = await new TransferValidator(body);

            if(accountValidated.errors) {
              throw new ExceptionTreatment(accountValidated.errors);
            }
            const accountBalanceOrigin = await new AccountsTable().list(
              accountValidated.account.originAccount.agency_number,  accountValidated.account.originAccount.agency_verification_code, 
              accountValidated.account.originAccount.account_verification_code,  accountValidated.account.originAccount.account_number
            );
            
            if(accountBalanceOrigin.length === 0) {
              throw new ExceptionTreatment('400: Conta de origem não encontrada');
            }
  
            let accountOrigin = accountBalanceOrigin[0];

            if(!(await bcrypt.compare(accountValidated.account.originAccount.password, accountOrigin.password))) {
                throw new ExceptionTreatment('400: Senha incoerente');
            }

            const accountBalanceDestiny = await new AccountsTable().list(
                accountValidated.account.destinyAccount.agency_number,  accountValidated.account.destinyAccount.agency_verification_code, 
                accountValidated.account.destinyAccount.account_verification_code,  accountValidated.account.destinyAccount.account_number
            );
              
            if(accountBalanceDestiny.length === 0) {
              throw new ExceptionTreatment('400: Conta de destino não encontrada');
            }
    
            let accountDestiny = accountBalanceDestiny[0];

            const customersOrigin = await new CustomersTable().list(accountValidated.account.originAccount.CPF);
  
            if(customersOrigin.length === 0) {
              throw new ExceptionTreatment('400: Usuário de origem não encontrado');
            }

            const customerOrigin = customersOrigin[0];

            const customersDestiny = await new CustomersTable().list(accountValidated.account.destinyAccount.CPF);
  
            if(customersDestiny.length === 0) {
              throw new ExceptionTreatment('400: Usuário de destino não encontrado');
            }

            const customerDestiny = customersDestiny[0];
  
            if(accountOrigin.balance < accountValidated.account.value + 1) {
              throw new ExceptionTreatment('400: Você está pobre');
            }
            
            const transferTransaction = await new TransactionTable().insert({
              account_destiny_id: accountDestiny.id,
              account_origin_id: accountOrigin.id,
              date: new Date(),
              id: v4(),
              type: 'Transfer',
              value: accountValidated.account.value
            });
  
            const rateTransaction = await new TransactionTable().insert({
              account_destiny_id: accountDestiny.id,
              account_origin_id: accountOrigin.id,
              date: new Date(),
              id: v4(),
              type: 'Transfer Rate',
              value: 1
            });
 
            accountOrigin = await new AccountsTable().update(
              Number(accountOrigin.balance) - Number(accountValidated.account.value) - 1, 
              accountOrigin.id
            );

            accountDestiny = await new AccountsTable().update(
                Number(accountDestiny.balance) + Number(accountValidated.account.value), 
                accountDestiny.id
              );
  
            return {
                transactionId: transferTransaction.id,
                date: transferTransaction.date,
                type: transferTransaction.type,
                value: transferTransaction.value,
                originAccount: {
                    accountNumber: accountOrigin.account_number,
                    accountVerificationCode: accountOrigin.account_verification_code,
                    agencyNumber: accountOrigin.agency_number,
                    agencyVerificationCode: accountOrigin.agency_verification_code,
                    document: customerOrigin.cpf
                },
                destinationAccount: {
                    accountNumber: accountDestiny.account_number,
                    accountVerificationCode: accountDestiny.account_verification_code,
                    agencyNumber: accountDestiny.agency_number,
                    agencyVerificationCode: accountDestiny.agency_verification_code,
                    document: customerDestiny.cpf
                }
            }
            

        } catch(error: any) {
            throw new ExceptionTreatment(error.message);
        } 
    }
}

export { CreateTransferServices }