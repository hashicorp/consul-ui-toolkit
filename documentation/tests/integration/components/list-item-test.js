/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | cut/list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it renders the list item container', async function (assert) {
    await render(hbs`<Cut::ListItem/>`);
    assert.dom(this.element).exists();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Cut::ListItem id="test-list-item" />`);
    assert.dom('#test-list-item').hasClass('cut-list-item');
  });

  // Static
  test('it should render a <div> if no @href, @onClick or @route is passed (default)', async function (assert) {
    await render(hbs`<Cut::ListItem id="test-list-item" />`);
    assert.dom('#test-list-item').hasTagName('div');
  });

  // Dynamic
  test('it should render a <a> link if @href is passed', async function (assert) {
    await render(hbs`<Cut::ListItem id="test-list-item" @href="#"/>`);
    assert.dom('#test-list-item').hasTagName('a');
    assert.dom('#test-list-item').hasAttribute('href', '#');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(hbs`<Cut::ListItem id="test-list-item" @route="dummy"/>`);
    assert.dom('#test-list-item').hasTagName('a');
    assert.dom('#test-list-item').hasAttribute('href', '/dummy');
  });

  test('it should render a <button> if @onClick is passed', async function (assert) {
    this.set('onClick', () => {});
    await render(hbs`
      <Cut::ListItem id="test-list-item" @onClick={{this.onClick}} />
    `);
    assert.dom('#test-list-item').hasTagName('button');
  });

  test('it should render a <a> link with custom "target" and "rel" attributes if they are passed as attributes', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" @href="#" target="test-target" rel="test-rel" />`
    );
    assert.dom('#test-list-item').hasAttribute('target', 'test-target');
    assert.dom('#test-list-item').hasAttribute('rel', 'test-rel');
  });

  test('it should render a <a> link withhout "target" and "rel" attributes if @isHrefExternal is false', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" @href="#" @isHrefExternal={{false}} />`
    );
    assert.dom('#test-list-item').doesNotHaveAttribute('target');
    assert.dom('#test-list-item').doesNotHaveAttribute('rel');
  });

  test('it should spread all the attributes passed to the <div> element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('div#test-list-item').hasClass('my-class');
    assert.dom('div#test-list-item').hasAttribute('data-test1');
    assert.dom('div#test-list-item').hasAttribute('data-test2', 'test');
  });

  test('it should spread all the attributes passed to the <a> element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" @href="#" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('a#test-list-item').hasClass('my-class');
    assert.dom('a#test-list-item').hasAttribute('data-test1');
    assert.dom('a#test-list-item').hasAttribute('data-test2', 'test');
  });

  test('it should spread all the attributes passed to the <LinkTo> element', async function (assert) {
    await render(
      hbs`<Cut::ListItem @route="index" id="test-list-item" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('a#test-list-item').hasClass('my-class');
    assert.dom('a#test-list-item').hasAttribute('data-test1');
    assert.dom('a#test-list-item').hasAttribute('data-test2', 'test');
  });

  test('it should spread all the attributes passed to the <button> element', async function (assert) {
    this.set('onClick', () => {});

    await render(
      hbs`<Cut::ListItem id="test-list-item" @onClick={{this.onClick}} class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('button#test-list-item').hasClass('my-class');
    assert.dom('button#test-list-item').hasAttribute('data-test1');
    assert.dom('button#test-list-item').hasAttribute('data-test2', 'test');
  });

  test('it should yield the content of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|><L.Content>test</L.Content></Cut::ListItem>`
    );
    assert.dom('div#test-list-item > div.cut-list-item__content').exists();
    assert
      .dom('div#test-list-item > div.cut-list-item__content')
      .hasText('test');
  });

  test('it should yield the action(button) of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|><L.Action as |A|><A.Button @text="test"/></L.Action></Cut::ListItem>`
    );
    assert.dom('div#test-list-item > div > button.hds-button').exists();
    assert.dom('div#test-list-item > div > button.hds-button').hasText('test');
  });

  test('it should yield the action(generic) of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|>
            <L.Action as |A|>
              <A.Generic>
                <pre>test</pre>
              </A.Generic>
            </L.Action>
          </Cut::ListItem>`
    );
    assert.dom('div#test-list-item > div > pre').exists();
    assert.dom('div#test-list-item > div > pre').hasText('test');
  });

  test('it should yield the action(dropdown) of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|>
            <L.Action as |A|>
              <A.Dropdown></A.Dropdown>
            </L.Action>
          </Cut::ListItem>`
    );
    assert.dom('div#test-list-item > div > div.hds-dropdown').exists();
  });
});
