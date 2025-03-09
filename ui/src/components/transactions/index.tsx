import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction, useAllTransactions } from '@/data/transactions';
import { Skeleton } from '../ui/skeleton';
import { useCallback, useEffect, useMemo } from 'react';
import { ErrorBoundary } from '../error-boundary';
import { TransactionType } from './type';
import { format } from 'date-fns';
import { TransactionPagination } from './pagination';
import { useQueryParams } from '@/hooks/query-params';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';

interface TransactionRowsProps {
  transactions: Transaction[] | undefined;
}

function SkeletonRows() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <Skeleton className="w-full h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full max-w-32 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full max-w-40 h-4" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export function TransactionRows({ transactions }: TransactionRowsProps) {
  useEffect(() => {
    if (!transactions) {
      throw new Error('Failed to load transactions');
    }
  }, [transactions]);

  const readableTimeStamp = useCallback((timestamp: string) => {
    const readable = format(timestamp, 'MMMM dd, yyyy hh:mm a');
    return readable;
  }, []);

  return (
    <TableBody>
      {transactions!.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell className="font-medium">$ {transaction.amount}</TableCell>
          <TableCell>
            <TransactionType type={transaction.type} />
          </TableCell>
          <TableCell>{readableTimeStamp(transaction.timestamp)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export function TransactionFallback() {
  return (
    <TableBody className="mt-4 border-destructive bg-destructive/35 p-2 w-full">
      <TableRow>
        <TableCell colSpan={3} className="text-center">
          Failed to load transactions
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export function Transactions() {
  const queryParams = useQueryParams();
  const { transactions, total, isLoading, isError, refetch } =
    useAllTransactions(
      queryParams['page'] ? parseInt(queryParams.page) : undefined
    );

  const currentPage = useMemo(() => {
    return parseInt(queryParams.page || '1');
  }, [queryParams]);

  const totalPages = useMemo(() => {
    const perPage = queryParams['per_page']
      ? parseInt(queryParams.per_page)
      : 10;
    return Math.ceil((total || 0) / perPage);
  }, [queryParams, total]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button onClick={() => refetch()}>
          <RefreshCw />
          Refresh
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading && <SkeletonRows />}
        {!isLoading && (
          <ErrorBoundary fallback={TransactionFallback}>
            <TransactionRows
              transactions={!isError ? transactions! : undefined}
            />
          </ErrorBoundary>
        )}
      </Table>
      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
