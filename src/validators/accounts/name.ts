const nameValidator = (name: string) => {
  if (!name) {
    return 'error: Nome é necessário | ';
  }

  if (name.length < 3) {
    return 'error: Nome inválido | ';
  }

  if (!name.trim()) {
    return 'error: Não pode haver espaço entre as letras no nome | ';
  }

  return name.trim();
};

export { nameValidator };
