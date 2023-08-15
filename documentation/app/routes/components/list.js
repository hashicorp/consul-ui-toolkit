/**
 * Copyright (c) HashiCorp, Inc.
 */

import Route from '@ember/routing/route';
import { v4 as uuidv4 } from 'uuid';

export default class ListRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
    status: {
      refreshModel: true,
    },
    source: {
      refreshModel: true,
    },
    serviceType: {
      refreshModel: true,
    },
    clusterId: {
      refreshModel: true,
    },
    search: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
  };

  model(queryParams) {
    console.log(queryParams);

    return {
      nextCursor: uuidv4(),
      prevCursor: uuidv4(),
    };
  }
}
