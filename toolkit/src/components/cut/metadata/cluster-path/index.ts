/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

interface Args {
  clusterId: string;
  partition: string;
  namespace: string;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class MetadataClusterPathComponent extends Component<Args> {}
