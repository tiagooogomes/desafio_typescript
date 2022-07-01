const passwordValidator = (password: string) => {
  if (!password) {
    return 'error: A senha é necessária | ';
  }

  if (password.length < 4) {
    return 'error: A senha está incorreta | ';
  }

  return password.trim();
};

export { passwordValidator };
