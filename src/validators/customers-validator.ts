// import {
//   passwordValidator,
//   birthdateValidator,
//   documentValidator,
//   nameValidator,
// } from './accounts';
import {
  PasswordValidator,
  EmailValidator,
  DateValidator,
  NameValidator,
  CpfValidator,
} from './customers';
import { customersType } from '../models';

class CustomersValidator {
  public user: Partial<customersType>;
  public errors: string;

  // private PasswordValidator = PasswordValidator;
  // private EmailValidator = EmailValidator;
  // private DateValidator = DateValidator;
  // private NameValidator = NameValidator;
  // private CpfValidator = CpfValidator;

  public constructor(user: customersType) {
    this.errors = '';
    this.user = this.validate(user);
  }

  private validate(user: customersType): Partial<customersType> {
    const validPassword = new PasswordValidator(user.password);
    const validBirtdate = new DateValidator(user.birtdate);
    const validEmail = new EmailValidator(user.email);
    const validName = new NameValidator(user.name);
    const validCPF = new CpfValidator(user.CPF);

    this.errors = this.errors.concat(
      `${validEmail.errors}${validName.errors}${validBirtdate.errors}${validCPF.errors}${validPassword.errors}`,
    );

    const userData: Partial<customersType> = {
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
//   let error = '';

//   const password = passwordValidator(account.password);
//   const birtdate = birthdateValidator(account.birtdate);
//   const document = documentValidator(account.document);
//   const name = nameValidator(account.name);

//   if (password.split(' ')[0] === 'error:') {
//     error += password;
//   }

//   if (birtdate.split(' ')[0] === 'error:') {
//     error += birtdate;
//   }

//   if (document.split(' ')[0] === 'error:') {
//     error += document;
//   }

//   if (name.split(' ')[0] === 'error:') {
//     error += name;
//   }

//   if (error) return error;
//   return account;
// };
