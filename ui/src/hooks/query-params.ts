import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface QueryParams {
  [key: string]: string | undefined;
}

export const useQueryParams = () => {
  const location = useLocation();

  const [queryParams, setQueryParams] = useState<QueryParams>({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParams: QueryParams = {};

    for (const [key, value] of params) {
      queryParams[key] = value;
    }

    setQueryParams(queryParams);
  }, [location.search]);

  return queryParams;
};
