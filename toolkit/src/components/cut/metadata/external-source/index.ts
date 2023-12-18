/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import {
  EXTERNAL_SOURCE_ICON_MAPPING,
  EXTERNAL_SOURCE_LABELS,
} from '../../../../utils/service-list-item';
import type { MetadataExternalSourceSignature } from 'src/types';

export default class MetadataExternalSourceComponent extends Component<MetadataExternalSourceSignature> {
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
