const accountCodeValidator = (code: string) => {
  if (!code) {
    return 'error: Account code required | ';
  }

  if (code.length !== 3) {
    return 'error: Account code date | ';
  }

  return code.trim();
};

export { accountCodeValidator };
