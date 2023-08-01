/**
 * Copyright (c) HashiCorp, Inc.
 */

import { helper } from '@ember/component/helper';

export default helper(([value]: [string]) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  return value
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/([A-Z][a-z])/g, ' $1')
    .replace(/ {2}/g, ' ')
    .replace(/^./g, (match) => match.toUpperCase());
});
