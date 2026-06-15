import { useCallback, useState } from "react";
import { useDisclosure } from "@kalortech/shared-logic";
import { useQuery } from "@tanstack/react-query";

import { LOGS_QUERY_KEYS, getLogs } from "~services";
import type { LogFilters } from "~services";

import { LOGS_PAGE_SIZE } from "./LogsPage.constants";

export const useLogsPage = () => {
  const filtersDrawerDisclosure = useDisclosure();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<LogFilters>({});

  const activeFilters: LogFilters = {
    ...filters,
    limit: LOGS_PAGE_SIZE,
    offset: (page - 1) * LOGS_PAGE_SIZE,
  };

  const { data: logsResponse, isLoading } = useQuery({
    queryKey: LOGS_QUERY_KEYS.list(activeFilters as Record<string, unknown>),
    queryFn: () => getLogs(activeFilters),
    refetchOnWindowFocus: false,
  });

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof LogFilters] !== undefined,
  );

  const onFiltersApplyHandler = useCallback((newFilters: LogFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const onPageChangeHandler = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    logs: logsResponse?.data,
    logsTotal: logsResponse?.total ?? 0,
    isLoading,
    page,
    filters,
    hasActiveFilters,
    filtersDrawerDisclosure,
    onFiltersApplyHandler,
    onPageChangeHandler,
  };
};
