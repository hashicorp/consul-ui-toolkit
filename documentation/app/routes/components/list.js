import Route from '@ember/routing/route';

export default class ListRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
  };

  model(queryParams) {
    console.log(queryParams);
    return {};
  }
}
