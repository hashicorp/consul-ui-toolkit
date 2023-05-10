/**
 * Copyright (c) HashiCorp, Inc.
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { dropTask } from 'ember-concurrency-decorators';

export interface ComponentSignature {
  Args: {
    clipboardText: string;
    timeout?: number;
    onSuccess(): void;
  };
}

export default class CopyBlockComponent extends Component<ComponentSignature> {
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
