const agencyNumberValidator = (agency: string) => {
  if (!agency) {
    return 'error: Agency number required | ';
  }

  if (agency.length !== 5) {
    return 'error: Agency number date | ';
  }

  return agency.trim();
};

export { agencyNumberValidator };
