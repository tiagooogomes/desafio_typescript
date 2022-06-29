const valueValidator = (value: string) => {
  if (!value) {
    return 'error: Value required | ';
  }

  return value.trim();
};

export { valueValidator };
