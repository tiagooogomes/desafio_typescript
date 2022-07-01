const accountCodeValidator = (code: string) => {
  if (!code) {
    return 'error: Código da conta é Necessário | ';
  }

  if (code.length !== 3) {
    return 'error: Código da conta inválido| ';
  }

  return code.trim();
};

export { accountCodeValidator };
