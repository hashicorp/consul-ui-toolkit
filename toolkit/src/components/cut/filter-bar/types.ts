/**
 * Copyright (c) HashiCorp, Inc.
 */

export interface FilterBarSignature {
  Args: {
    config: FilterConfig;
    name?: string;
    count?: number;
    totalCount?: number;
    onChange: (config: FilterConfig) => void;
  };
}

export interface SortCheckmarkSignature {
  Args: {
    checkmark: unknown;
    config: FilterConfig;
    value: string;
    name: string;
    onSortChange: (value: string, text: string) => void;
  };
}

export interface FilterSignature {
  Args: {
    name: string;
    config: FilterConfig;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    softToggle: (toggle: ToggleArgs) => void;
    applyFilter: (name: string) => void;
    clearPendingFilter: () => void;
    isChecked: (
      localConfig: FilterConfig,
      name: string,
      value: unknown
    ) => boolean;
    isMultiSelect?: boolean;
    batch?: boolean;
    dropdown?: unknown;
    listPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  };
}

export interface FilterBarCheckboxSignature {
  Args: {
    filterName: string;
    name: string;
    value: unknown;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    isChecked: (
      localConfig: FilterConfig,
      name: string,
      value: unknown
    ) => boolean;
  };
}

export interface FilterBarCheckboxSignature {
  Args: {
    filterName: string;
    name: string;
    value: unknown;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    isChecked: (
      localConfig: FilterConfig,
      name: string,
      value: unknown
    ) => boolean;
  };
}

export interface FilterBarCheckboxSignature {
  Args: {
    filterName: string;
    name: string;
    value: unknown;
    localConfig: FilterConfig;
    toggle: (toggle: ToggleArgs) => void;
    isChecked: (
      localConfig: FilterConfig,
      name: string,
      value: unknown
    ) => boolean;
  };
}

export interface FilterConfig {
  search?: Search;
  filters?: Filters;
  sort?: Sort;
}

export interface Sort {
  value?: string;
}

export interface Search {
  value?: string;
}

export interface Filter {
  text: string;
  value: unknown;
  isRequired?: boolean;
}

export interface Filters {
  [name: string]: Filter | Filter[] | undefined;
}

export interface AppliedFilter {
  name: string;
  value: Filter[];
  isMultiSelect?: boolean;
  isRequired?: boolean;
}

export interface ToggleArgs {
  filterName: string;
  value: unknown;
  text: string;
  isMultiSelect?: boolean;
  isRequired?: boolean;
}
