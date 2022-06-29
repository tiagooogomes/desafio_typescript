import {
  agencyNumberValidator,
  accountCodeValidator,
  accountNumberValidator,
//   valueValidator,
} from './customers';
import { documentValidator } from './accounts';
import { transactionType } from '../models';

const accountValidator = (deposit: transactionType) => {
  let error = '';

  const accountVerificationCode = accountCodeValidator(deposit.verificationCode);
  const accountNumber = accountNumberValidator(deposit.accountNumber);
  const agencyNumber = agencyNumberValidator(deposit.agencyNumber);
  const document = documentValidator(deposit.document);
  //   const value = valueValidator(deposit.value);

  if (accountVerificationCode.split(' ')[0] === 'error:') {
    error += accountVerificationCode;
  }

  if (accountNumber.split(' ')[0] === 'error:') {
    error += accountNumber;
  }

  if (agencyNumber.split(' ')[0] === 'error:') {
    error += agencyNumber;
  }

  if (document.split(' ')[0] === 'error:') {
    error += document;
  }

  //   if (value.split(' ')[0] === 'error:') {
  //     error += value;
  //   }

  if (error) return error;
  return deposit;
};

export { accountValidator };
