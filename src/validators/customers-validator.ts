import {
  passwordValidator,
  birthdateValidator,
  documentValidator,
  nameValidator,
} from './accounts';
import { accountType } from '../models';

const customersValidator = (account: accountType) => {
  let error = '';

  const password = passwordValidator(account.password);
  const birtdate = birthdateValidator(account.birtdate);
  const document = documentValidator(account.document);
  const name = nameValidator(account.name);

  if (password.split(' ')[0] === 'error:') {
    error += password;
  }

  if (birtdate.split(' ')[0] === 'error:') {
    error += birtdate;
  }

  if (document.split(' ')[0] === 'error:') {
    error += document;
  }

  if (name.split(' ')[0] === 'error:') {
    error += name;
  }

  if (error) return error;
  return account;
};

export { customersValidator };
