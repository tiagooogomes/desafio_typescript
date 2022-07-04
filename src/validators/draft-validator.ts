import {
    AccountNumberValidator,
    AgencyNumberValidator,
    AccountCodeValidator,
    AgencyCodeValidator,
    valueValidator,
  } from './accounts';
  
import { DraftBody } from '../models';
import { CpfValidator, PasswordValidator } from './customers';
  
class DraftValidator {

public account: DraftBody;
public errors: string;

public constructor(body: DraftBody) {
    this.errors = '';
    this.account = this.validate(body);
}

private validate(body: DraftBody): DraftBody {
    const validAccountCode = new AccountCodeValidator(body.account.account_verification_code);
    const validAgencyCode = new AgencyCodeValidator(body.account.agency_verification_code);
    const validAccountNumber = new AccountNumberValidator(body.account.account_number);
    const validAgencyNumber = new AgencyNumberValidator(body.account.agency_number);
    const validPassword =  new PasswordValidator(body.account.password);
    const validCpf = new CpfValidator(body.account.CPF);
    const validValue = new valueValidator(body.value);

    this.errors = this.errors.concat(
    `${validAccountCode.errors}${validAgencyCode.errors}${validAccountNumber.errors}${validAgencyNumber.errors}${validCpf.errors}${validValue.errors}`,
    );

    const accountData: DraftBody = {
        account: {
            agency_verification_code: validAgencyCode.agencyCodeVerification,
            account_verification_code: validAccountCode.accountVerification,
            account_number: validAccountNumber.account_number,
            agency_number: validAgencyNumber.agency_number,
            password: validPassword.password,
            CPF: validCpf.cpf
        },
        value: validValue.value
    };

    return accountData;
}
};

export { DraftValidator };
  