import type { LogFilters } from "~services";

export interface LogFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: LogFilters) => void;
  currentFilters: LogFilters;
}

export interface LogFiltersFormValues {
  action: string;
  entityType: string;
  createdFrom: string;
  createdTo: string;
}
