import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMemo } from 'react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function TransactionPagination(props: TablePaginationProps) {
  const handlePrevPage = () => {
    if (props.currentPage > 1) {
      let querStr = `?page=${props.currentPage - 1}`;
      if (props.currentPage === 2) {
        querStr = '';
      }
      window.history.pushState({}, '', querStr);
    }
  };

  const handleNextPage = () => {
    if (props.currentPage < props.totalPages) {
      window.history.pushState({}, '', `?page=${props.currentPage + 1}`);
    }
  };

  const handlePageChange = (page: number) => {
    window.history.pushState({}, '', `?page=${page}`);
  };

  const numberOfPages = useMemo(() => {
    if (props.totalPages > 3) {
      return 3;
    } else return props.totalPages;
  }, [props.totalPages]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>
        {Array.from({ length: numberOfPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => handlePageChange(index + 1)}
              isActive={index + 1 === props.currentPage}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {props.totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
