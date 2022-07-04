interface Transaction {
  account_origin_id: string | null;
	account_destiny_id:string | null;
  value: number;
  type: string;
  date: Date;
  id: string;
};

interface Customer {
  birtdate: Date;
	email: string;
	name: string;
	cpf: string;
  id: string;
};

export { Transaction, Customer };