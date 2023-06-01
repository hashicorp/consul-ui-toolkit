/**
 * Copyright (c) HashiCorp, Inc.
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | ComponentApi', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the api spec', async function (assert) {
    await render(hbs`
      <ComponentApi
        @name="text"
        @type="string"
        @description="The text that serves as the description" 
      />
    `);

    assert.dom('.doc-componentApi-name dd').hasText('text');
    assert.dom('.doc-componentApi-type dd').hasText('string');
    assert
      .dom('.doc-componentApi-description dd')
      .hasText('The text that serves as the description');

    assert.dom('.doc-componentApi-values').doesNotExist();
    assert.dom('.doc-componentApi-default').doesNotExist();
  });

  test('it renders the default when provided if there are no values', async function (assert) {
    await render(hbs`
      <ComponentApi
        @name="text"
        @type="string"
        @default="foo"
      />
    `);

    assert.dom('.doc-componentApi-default dd').hasText('foo');

    await render(hbs`
      <ComponentApi
        @name="type"
        @type="string"
        @default="neutral"
        @values={{array "success" "neutral" "warning" "critical"}}
      />
    `);

    assert.dom('.doc-componentApi-default dd').doesNotExist();
    assert.dom('.doc-componentApi-values dd').exists();

    const values = await findAll('.doc-componentApi-values > dd > .hds-badge');

    assert.strictEqual(values.length, 4);
    assert.dom(values[0]).hasText('success');
    assert.dom(values[0]).hasClass('hds-badge--type-filled');
    assert.dom(values[1]).hasText('neutral');
    assert.dom(values[1]).hasClass('hds-badge--type-inverted');
    assert.dom(values[2]).hasText('warning');
    assert.dom(values[2]).hasClass('hds-badge--type-filled');
    assert.dom(values[3]).hasText('critical');
    assert.dom(values[3]).hasClass('hds-badge--type-filled');
  });
});
