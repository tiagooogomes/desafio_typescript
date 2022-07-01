const accountNumberValidator = (account: string) => {
  if (!account) {
    return 'error: Número de conta é necessário| ';
  }

  if (account.length !== 7) {
    return 'error: Número de conta incorreto | ';
  }

  return account.trim();
};

export { accountNumberValidator };
