const nameValidator = (name: string) => {
  if (!name) {
    return 'error: field required | ';
  }

  if (name.length < 3) {
    return 'error: name too short | ';
  }

  if (!name.trim()) {
    return 'error: cannot be only space characters | ';
  }

  return name.trim();
};

export { nameValidator };
