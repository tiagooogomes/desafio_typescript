import {
    AccountNumberValidator,
    AgencyNumberValidator,
    AccountCodeValidator,
    AgencyCodeValidator,
    valueValidator,
  } from './accounts';
  
import { DepositBody } from '../models';
import { CpfValidator } from './customers';
  
class DepositValidator {

public account: DepositBody;
public errors: string;

public constructor(body: DepositBody) {
    this.errors = '';
    this.account = this.validate(body);
}

private validate(body: DepositBody): DepositBody {
    const validAccountCode = new AccountCodeValidator(body.account.account_verification_code);
    const validAgencyCode = new AgencyCodeValidator(body.account.agency_verification_code);
    const validAccountNumber = new AccountNumberValidator(body.account.account_number);
    const validAgencyNumber = new AgencyNumberValidator(body.account.agency_number);
    const validCpf = new CpfValidator(body.account.CPF);
    const validValue = new valueValidator(body.value);

    this.errors = this.errors.concat(
    `${validAccountCode.errors}${validAgencyCode.errors}${validAccountNumber.errors}${validAgencyNumber.errors}${validCpf.errors}${validValue.errors}`,
    );

    const accountData: DepositBody = {
        account: {
            agency_verification_code: validAgencyCode.agencyCodeVerification,
            account_verification_code: validAccountCode.accountVerification,
            account_number: validAccountNumber.account_number,
            agency_number: validAgencyNumber.agency_number,
            CPF: validCpf.cpf
        },
        value: validValue.value
    };

    return accountData;
}
};

export { DepositValidator };
  