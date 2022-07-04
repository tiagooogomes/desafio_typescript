import {
    AccountNumberValidator,
    AgencyNumberValidator,
    AccountCodeValidator,
    AgencyCodeValidator,
  } from './accounts';
  
import { ExtractBody } from '../models';
import { CpfValidator } from './customers';
  
class ExtractValidator {

public account: ExtractBody;
public errors: string;

public constructor(body: ExtractBody) {
    this.errors = '';
    this.account = this.validate(body);
}

private validate(body: ExtractBody): ExtractBody {
    const validAccountCode = new AccountCodeValidator(body.account_verification_code);
    const validAgencyCode = new AgencyCodeValidator(body.agency_verification_code);
    const validAccountNumber = new AccountNumberValidator(body.account_number);
    const validAgencyNumber = new AgencyNumberValidator(body.agency_number);
    const validCpf = new CpfValidator(body.CPF);

    this.errors = this.errors.concat(
    `${validAccountCode.errors}${validAgencyCode.errors}${validAccountNumber.errors}${validAgencyNumber.errors}${validCpf.errors}`,
    );

    const accountData: ExtractBody = {
        agency_verification_code: validAgencyCode.agencyCodeVerification,
        account_verification_code: validAccountCode.accountVerification,
        account_number: validAccountNumber.account_number,
        agency_number: validAgencyNumber.agency_number,
        CPF: validCpf.cpf
    };

    return accountData;
}
};

export { ExtractValidator };
  