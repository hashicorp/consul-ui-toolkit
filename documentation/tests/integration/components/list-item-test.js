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
    await render(hbs`<Cut::ListItem id="test-list-item" @href="#" />`);
    assert.dom('#test-list-item .active').hasTagName('a');
    assert.dom('#test-list-item .active').hasAttribute('href', '#');
  });

  test('it should render a <a> link if @route is passed', async function (assert) {
    await render(hbs`<Cut::ListItem id="test-list-item" @route="dummy"/>`);
    assert.dom('#test-list-item .active').hasTagName('a');
    assert.dom('#test-list-item .active').hasAttribute('href', '/dummy');
  });

  test('it should render a <button> if @onClick is passed', async function (assert) {
    this.set('onClick', () => {});
    await render(hbs`
      <Cut::ListItem id="test-list-item" @onClick={{this.onClick}} />
    `);
    assert.dom('#test-list-item .active').hasTagName('button');
  });

  test('it should render a <a> link with custom "target" and "rel" attributes if they are passed as attributes', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" @href="#" target="test-target" rel="test-rel" />`
    );
    assert.dom('#test-list-item .active').hasAttribute('target', 'test-target');
    assert.dom('#test-list-item .active').hasAttribute('rel', 'test-rel');
  });

  test('it should render a <a> link withhout "target" and "rel" attributes if @isHrefExternal is false', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" @href="#" @isHrefExternal={{false}} />`
    );
    assert.dom('#test-list-item .active').doesNotHaveAttribute('target');
    assert.dom('#test-list-item .active').doesNotHaveAttribute('rel');
  });

  test('it should spread all the attributes passed to the <div> element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" class="my-class" data-test1 data-test2="test" />`
    );
    assert.dom('div#test-list-item').hasClass('my-class');
    assert.dom('div#test-list-item').hasAttribute('data-test1');
    assert.dom('div#test-list-item').hasAttribute('data-test2', 'test');
  });

  test('it should yield the content of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|><L.Content id="test-content">test</L.Content></Cut::ListItem>`
    );
    assert.dom('#test-list-item #test-content').exists();
    assert.dom('#test-list-item #test-content').hasText('test');
  });

  test('it should yield the action(button) of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|><L.ActionButton @text="test" id="test-button"/></Cut::ListItem>`
    );
    assert.dom('#test-list-item #test-button').exists();
    assert.dom('#test-list-item #test-button').hasText('test');
  });

  test('it should yield the action(generic) of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|>
            <L.ActionGeneric>
               <pre>test</pre>
            </L.ActionGeneric>
          </Cut::ListItem>`
    );
    assert.dom('#test-list-item pre').exists();
    assert.dom('#test-list-item pre').hasText('test');
  });

  test('it should yield the action(dropdown) of the List item element', async function (assert) {
    await render(
      hbs`<Cut::ListItem id="test-list-item" as |L|>
            <L.ActionDropdown id="test-dropdown"/>
          </Cut::ListItem>`
    );
    assert.dom('#test-list-item #test-dropdown').exists();
  });

  test('it should render Cut::ListItem::Template and has a element class', async function (assert) {
    await render(
      hbs`<Cut::ListItem::Template id="test-list-item-template"></Cut::ListItem::Template>`
    );
    assert
      .dom('div#test-list-item-template')
      .hasClass('cut-list-item-template');
  });

  test('it should have Cut::ListItem::Template with yielded Label component', async function (assert) {
    await render(
      hbs`
        <Cut::ListItem::Template id="test-list-item-template" as |T|>
          <T.Label></T.Label>
        </Cut::ListItem::Template>`
    );
    assert
      .dom('div#test-list-item-template > div.cut-list-item-label')
      .exists();
  });

  test('it should have Cut::ListItem::Template with yielded Icon component', async function (assert) {
    await render(
      hbs`
        <Cut::ListItem::Template id="test-list-item-template" as |T|>
          <T.Icon @name="network"></T.Icon>
        </Cut::ListItem::Template>`
    );
    assert.dom('div#test-list-item-template svg.flight-icon').exists();
  });

  test('it should have Cut::ListItem::Template with yielded Badge component', async function (assert) {
    await render(
      hbs`
        <Cut::ListItem::Template id="test-list-item-template" as |T|>
          <T.Badge @text="test"></T.Badge>
        </Cut::ListItem::Template>`
    );
    assert.dom('div#test-list-item-template div.hds-badge').exists();
    assert.dom('div#test-list-item-template div.hds-badge').hasText('test');
  });

  test('it should have Cut::ListItem::Label with yielded Title component', async function (assert) {
    await render(
      hbs`
        <Cut::ListItem::Label id="test-list-item-label" as |L|>
          <L.Title>test</L.Title>
        </Cut::ListItem::Label>`
    );
    assert
      .dom('div#test-list-item-label div.cut-list-item-label--title')
      .exists();
    assert
      .dom('div#test-list-item-label div.cut-list-item-label--title')
      .hasText('test');
  });

  test('it should have Cut::ListItem::Label with yielded Metadata component', async function (assert) {
    await render(
      hbs`
        <Cut::ListItem::Label id="test-list-item-label" as |L|>
          <L.Metadata>test</L.Metadata>
        </Cut::ListItem::Label>`
    );
    assert
      .dom('div#test-list-item-label div.cut-list-item-label--metadata')
      .exists();
    assert
      .dom('div#test-list-item-label div.cut-list-item-label--metadata')
      .hasText('test');
  });
});
