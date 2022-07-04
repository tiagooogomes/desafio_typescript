import {
  PasswordValidator,
  EmailValidator,
  DateValidator,
  NameValidator,
  CpfValidator,
} from './customers';
import { AccountBody } from '../models';

class CustomersValidator {
  public user: Partial<AccountBody>;
  public errors: string;

  public constructor(user: AccountBody) {
    this.errors = '';
    this.user = this.validate(user);
  }

  private validate(user: AccountBody): Partial<AccountBody> {
    const validPassword = new PasswordValidator(user.password);
    const validBirtdate = new DateValidator(user.birtdate);
    const validEmail = new EmailValidator(user.email);
    const validName = new NameValidator(user.name);
    const validCPF = new CpfValidator(user.CPF);

    this.errors = this.errors.concat(
      `${validEmail.errors}${validName.errors}${validBirtdate.errors}${validCPF.errors}${validPassword.errors}`,
    );

    const userData: Partial<AccountBody> = {
      birtdate: validBirtdate.date,
      email: validEmail.email,
      name: validName.name,
      CPF: validCPF.cpf,
      password: validPassword.password,
    };

    return userData;
  }
}

export { CustomersValidator };
