const accountNumberValidator = (account: string) => {
  if (!account) {
    return 'error: Account number required | ';
  }

  if (account.length !== 7) {
    return 'error: Account number date | ';
  }

  return account.trim();
};

export { accountNumberValidator };
