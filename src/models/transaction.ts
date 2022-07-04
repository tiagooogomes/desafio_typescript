interface Transaction {
  id: string;
  account_origin_id: string | null;
	account_destiny_id:string | null;
  value: number;
  date: Date;
  type: string;
}

interface Customer {
  id: string;
	birtdate: Date;
	email: string;
	name: string;
	cpf: string;
}

export { Transaction, Customer };