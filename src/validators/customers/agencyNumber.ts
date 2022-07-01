const agencyNumberValidator = (agency: string) => {
  if (!agency) {
    return 'error: Número da agência é necessário | ';
  }

  if (agency.length !== 5) {
    return 'error: Número da agência é incorreto | ';
  }

  return agency.trim();
};

export { agencyNumberValidator };
