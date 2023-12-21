/**
 * Copyright (c) HashiCorp, Inc.
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | InPageNav', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the links', async function (assert) {
    await render(hbs`
      <InPageNav as |I|>
        <I.Link @section="#test-one" @depth={{1}}>Test Link 1</I.Link>
        <I.Link @section="#test-two" @depth={{2}}>Test Link 2</I.Link>
        <I.Link @depth={{1}}>Link with no section</I.Link>
        <I.Link @section="#test-three">Link with no depth</I.Link>
      </InPageNav>,
    `);

    const links = findAll('.doc-InPageNav-link');

    assert.strictEqual(links.length, 4, 'There should be 4 links on the page');
    assert
      .dom('.doc-InPageNav-link:nth-child(1)')
      .hasClass(
        'doc-InPageNav-link--depth-1',
        'There should be the level 1 depth class',
      );

    assert
      .dom('.doc-InPageNav-link:nth-child(1) > a')
      .hasAttribute(
        'href',
        '#test-one',
        'Should have the #test-one href value',
      );

    assert
      .dom('.doc-InPageNav-link:nth-child(2)')
      .hasClass(
        'doc-InPageNav-link--depth-2',
        'There should be the level 2 depth class',
      );

    assert
      .dom('.doc-InPageNav-link:nth-child(3) > a')
      .hasAttribute(
        'href',
        '#',
        "It should have a '#' href value when @section is not passed in",
      );

    assert
      .dom('.doc-InPageNav-link:nth-child(4)')
      .hasClass(
        'doc-InPageNav-link--depth-1',
        'There should be the level 1 depth class when depth is not passed in',
      );
  });
});
