/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { dropTask } from 'ember-concurrency-decorators';
import { CopyBlockSignature } from 'src/types';

export default class CopyBlockComponent extends Component<CopyBlockSignature> {
  @tracked isSuccessfullyCopied = false;

  get timeout() {
    return this.args.timeout || 1000;
  }

  @dropTask
  *copied() {
    this.isSuccessfullyCopied = true;

    this.args?.onSuccess?.();

    yield timeout(this.timeout);
    this.isSuccessfullyCopied = false;
  }
}
