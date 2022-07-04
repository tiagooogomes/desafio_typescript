import {
  AccountNumberValidator,
  AgencyNumberValidator,
  AccountCodeValidator,
  AgencyCodeValidator,
} from './accounts';

import { Account } from '../models';

class AccountValidator {

  public account: Partial<Account>;
  public errors: string;

  public constructor(user: Account) {
    this.errors = '';
    this.account = this.validate(user);
  };

  private validate(account: Account): Partial<Account> {
    const validAccountCode = new AccountCodeValidator(account.account_verification_code);
    const validAgencyCode = new AgencyCodeValidator(account.agency_verification_code);
    const validAccountNumber = new AccountNumberValidator(account.account_number);
    const validAgencyNumber = new AgencyNumberValidator(account.agency_number);

    this.errors = this.errors.concat(
      `${validAccountCode.errors}${validAgencyCode.errors}${validAccountNumber.errors}${validAgencyNumber.errors}`,
    );

    const accountData: Partial<Account> = {
      agency_verification_code: validAgencyCode.agencyCodeVerification,
      account_verification_code: validAccountCode.accountVerification,
      account_number: validAccountNumber.account_number,
      agency_number: validAgencyNumber.agency_number,
    };

    return accountData;
  };
};

export { AccountValidator };
