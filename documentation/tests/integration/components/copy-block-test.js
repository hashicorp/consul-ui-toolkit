/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { triggerCopySuccess } from 'ember-cli-clipboard/test-support';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | CopyBlock', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders copy button on mouse over', async function (assert) {
    await render(hbs`<Cut::CopyBlock id="test-copy-block"/>`);
    await triggerEvent('#test-copy-block', 'mouseover');

    assert
      .dom('#test-copy-block svg')
      .hasAttribute('data-test-icon', 'clipboard-copy');
  });

  test('it renders a block', async function (assert) {
    await render(hbs`<Cut::CopyBlock>A convenient shortcut</Cut::CopyBlock>`);
    assert
      .dom('[data-test-copy-block-content]')
      .hasText('A convenient shortcut');
  });

  test('it calls onSuccess', async function (assert) {
    let onSuccess = sinon.spy();
    this.onSuccess = onSuccess;

    await render(
      hbs`<Cut::CopyBlock @onSuccess={{this.onSuccess}} id="test-copy-block"/>`,
    );
    await triggerEvent('#test-copy-block', 'mouseover');
    assert
      .dom('#test-copy-block svg')
      .hasAttribute('data-test-icon', 'clipboard-copy');
    await triggerCopySuccess('#test-copy-block .copy-btn');

    assert.ok(onSuccess.calledOnce, 'calls onSuccess when is privided');
  });

  test('it changes icon on success copied', async function (assert) {
    await render(hbs`<Cut::CopyBlock id="test-copy-block"/>`);
    await triggerEvent('#test-copy-block', 'mouseover');
    assert
      .dom('#test-copy-block svg')
      .hasAttribute('data-test-icon', 'clipboard-copy');
    await triggerCopySuccess('#test-copy-block .copy-btn');
    assert
      .dom('#test-copy-block svg')
      .hasAttribute('data-test-icon', 'clipboard-checked');
  });
});
