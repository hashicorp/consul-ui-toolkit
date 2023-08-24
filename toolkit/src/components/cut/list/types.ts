/**
 * Copyright (c) HashiCorp, Inc.
 */

export interface PaginationSignature {
  Args: {
    nextCursor?: string;
    prevCursor?: string;
    pageSizes?: number[];
    currentPageSize?: number;
    queryFunction?: (page: string) => {
      [key: string]: string | number | unknown;
    };
    onPageChange?: (page: string) => void;
    onPageSizeChange?: (size: number) => void;
  };
}
