/**
 * Copyright (c) HashiCorp, Inc.
 */

export interface PaginationSignature {
  Args: {
    nextCursor?: string;
    prevCursor?: string;
    pageSizes?: number[];
    currentPageSize?: number;
    model?: string | unknown;
    models?: string[] | unknown[];
    replace?: boolean;
    queryFunction?: (page: string) => {
      [key: string]: string | number | unknown;
    };
    onPageChange?: (page: string) => void;
    onPageSizeChange?: (size: number) => void;
  };
}
