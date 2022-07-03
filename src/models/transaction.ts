import { account } from '.';

interface extractType {
    account: account;
}

interface depositType {
    id: string;
    account: account;
    value: string;
    type: string;
    date: string;
}

interface transferType {
    id: string;
    origin: {
      account: account;
    }  
    destiny: {
      account: account;
    }
    value: string;
    type: string;
    date: string;
}

interface draftType {
    id: string;
    account: account;
    value: string;
    type: string;
    date: string;
}

export { extractType, depositType, transferType, draftType };