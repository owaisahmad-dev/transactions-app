import { API_URL } from '@/constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ky from 'ky';

export interface Transactions {
  transactions: Transaction[];
  total: number;
}

export interface Transaction {
  id: number;
  amount: number;
  timestamp: string;
  type: 'debit' | 'credit';
}

const fetchTransactions = async (page: number | undefined) => {
  const response = await ky.get(`${API_URL}/transactions`, {
    searchParams: {
      page: page ? page.toString() : '1',
      per_page: '10',
    },
  });
  if (response.status >= 200 && response.status < 300) {
    return (await response.json()) as Transactions;
  }
  console.error('Failed to fetch transactions', response.status);
  throw new Error('Failed to fetch transactions');
};

export const useAllTransactions = (page: number | undefined) => {
  const query = useQuery({
    queryKey: ['transactions', page],
    queryFn: async () => fetchTransactions(page),
    placeholderData: keepPreviousData,
  });

  return {
    transactions: query.data?.transactions,
    total: query.data?.total,
    ...query,
  };
};
