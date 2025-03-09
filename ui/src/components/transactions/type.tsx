import { Badge } from '../ui/badge';

interface TransactionTypeProps {
  type: 'credit' | 'debit';
}

export function TransactionType({ type }: TransactionTypeProps) {
  if (type === 'credit') {
    return <Badge variant="success">Credit</Badge>;
  } else return <Badge variant="destructive">Debit</Badge>;
}
