/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';

interface Args {
  clusterId: string;
  partition: string;
  namespace: string;
}

export default class MetadataClusterPathComponent extends Component<Args> {}
