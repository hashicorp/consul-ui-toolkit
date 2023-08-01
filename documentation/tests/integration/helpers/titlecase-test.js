/**
 * Copyright (c) HashiCorp, Inc.
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | titlecase', function (hooks) {
  setupRenderingTest(hooks);

  test('formats text to be titlecase', async function (assert) {
    this.set('value', 'test');
    await render(hbs`{{titlecase this.value}}`);
    assert.strictEqual(this.element.textContent.trim(), 'Test');

    this.set('value', 'testLongerString');
    assert.strictEqual(this.element.textContent.trim(), 'Test Longer String');

    this.set('value', 'clusterID');
    assert.strictEqual(this.element.textContent.trim(), 'Cluster ID');
  });

  test('returns null for non-string values', async function (assert) {
    this.set('value', undefined);
    await render(hbs`{{titlecase this.value}}`);
    assert.strictEqual(this.element.textContent.trim(), '');

    this.set('value', 123);
    assert.strictEqual(this.element.textContent.trim(), '');

    this.set('value', { a: 'bar' });
    assert.strictEqual(this.element.textContent.trim(), '');
  });
});
