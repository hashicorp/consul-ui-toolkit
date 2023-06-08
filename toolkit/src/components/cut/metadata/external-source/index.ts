/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  EXTERNAL_SOURCE_ICON_MAPPING,
  EXTERNAL_SOURCE_LABELS,
  ExternalSource,
} from '../../../../utils/service-list-item';

interface ComponentSignature {
  Args: {
    externalSource: ExternalSource;
  };
}

export default class MetadataExternalSourceComponent extends Component<ComponentSignature> {
  get externalSourceIcon() {
    const { externalSource } = this.args;

    return externalSource !== undefined
      ? EXTERNAL_SOURCE_ICON_MAPPING[externalSource]
      : null;
  }

  get externalSourceText() {
    const { externalSource } = this.args;

    return externalSource !== undefined
      ? EXTERNAL_SOURCE_LABELS[externalSource]
      : null;
  }
}
