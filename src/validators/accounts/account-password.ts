const passwordValidator = (password: string) => {
  if (!password) {
    return 'error: password required | ';
  }

  if (password.length < 4) {
    return 'error: password date | ';
  }

  return password.trim();
};

export { passwordValidator };
