/**
 * Copyright (c) HashiCorp, Inc.
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  fillIn,
  findAll,
  render,
  resetOnerror,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

async function setupTest(config) {
  this.set(
    'config',
    config || {
      search: {
        value: '',
      },
      filters: {
        status: [
          { text: 'Running', value: 'running' },
          { text: 'Warning', value: 'warning' },
        ],
        juice: {
          text: 'Orange',
          value: 'oj',
          isRequired: true,
        },
      },
      sort: {
        text: 'critical to healthy',
        value: 'health',
      },
    }
  );

  const onChange = sinon.spy();
  this.onChange = onChange;

  await render(hbs`
    <Cut::FilterBar @config={{this.config}} @onChange={{this.onChange}} as |FB|>
      <FB.Search placeholder="Search for services" data-test-search />
      <FB.FilterGroup as |Filters|>
        <Filters.Filter
          @name="status"
          @batch={{true}}
          @isMultiSelect={{true}}
          as |F|
        >
          <F.ToggleButton @text="Status" data-test-status-filter />
          <F.Checkbox @value="running" @name="Running" data-test-running-value><Hds::Badge
              @text="running"
              @color="success"
            /></F.Checkbox>
          <F.Checkbox @value="warning" @name="Warning"><Hds::Badge
              @text="warning"
              @color="warning"
            /></F.Checkbox>
          <F.Checkbox @value="critical" @name="Critical" data-test-critical-value><Hds::Badge
              @text="critical"
              @color="critical"
            /></F.Checkbox>
        </Filters.Filter>
        <Filters.Filter @name="type" as |F|>
          <F.ToggleButton @text="Type" data-test-type-filter />
          <F.Checkmark @value="consul" @name="Consul" data-test-consul-value>Consul</F.Checkmark>
          <F.Checkmark @value="nomad" @name="Nomad" data-test-nomad-value>Nomad</F.Checkmark>
          <F.Checkmark @value="vault" @name="Vault">Vault</F.Checkmark>
        </Filters.Filter>
        <Filters.Filter @name="juice" as |F|>
          <F.ToggleButton @text="Juice" />
          <F.Radio @value="oj" @name="Orange">Orange Juice</F.Radio>
          <F.Radio @value="apple" @name="Apple">Apple Juice</F.Radio>
          <F.Radio @value="lemonade" @name="Lemonade">Lemonade</F.Radio>
        </Filters.Filter>
      </FB.FilterGroup>
      <FB.Sort as |S|>
        <S.Checkmark @value="health" @name="Critical to healthy">Critical to Healthy</S.Checkmark>
        <S.Checkmark @value="-health" @name="Healthy to critical">
          Healthy to Critical</S.Checkmark>
        <S.Checkmark @value="instances" @name="Instance count" data-test-instance-count-value />
      </FB.Sort>
    </Cut::FilterBar>
  `);

  return { onChange };
}

module('Integration | Component | cut/filter-bar', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    sinon.restore();
    resetOnerror();
  });

  test('applied filters should update when filters change', async function (assert) {
    const { onChange } = await setupTest.call(this);

    const labels = findAll('.cut-filter-bar-applied-filter-label');

    assert.strictEqual(labels.length, 2, 'There should be 2 applied labels');
    assert.strictEqual(labels[0].textContent, 'Status:');
    assert.strictEqual(labels[1].textContent, 'Juice:');

    const tags = findAll('.cut-filter-bar-results .hds-tag');
    assert.strictEqual(tags.length, 3, 'There should be applied filter tags');
    assert.strictEqual(tags[0].textContent.trim(), 'Running');
    assert.strictEqual(tags[1].textContent.trim(), 'Warning');
    assert.strictEqual(tags[2].textContent.trim(), 'Orange');

    const tagButtons = findAll('.cut-filter-bar-results .hds-tag button');
    assert.strictEqual(
      tagButtons.length,
      2,
      'There should only be 2 tag dismiss buttons'
    );

    await click(tagButtons[0]);
    assert.ok(onChange.calledOnce);

    let newConfig = onChange.getCall(0).args;
    assert.strictEqual(newConfig[0].filters.status.length, 1);
    assert.deepEqual(newConfig[0].filters, {
      status: [
        {
          text: 'Warning',
          value: 'warning',
        },
      ],
      juice: {
        text: 'Orange',
        value: 'oj',
        isRequired: true,
      },
    });
    assert.notOk(
      newConfig[0].filters.status.find((filter) => filter.value === 'running'),
      'The running status should be removed'
    );

    await click('.cut-filter-bar-results > button');
    assert.ok(onChange.calledTwice);
    newConfig = onChange.getCall(1).args;
    assert.deepEqual(newConfig[0].filters, {
      juice: {
        text: 'Orange',
        value: 'oj',
        isRequired: true,
      },
    });
  });

  test("clear filters doesn't show when there are only required filters", async function (assert) {
    await setupTest.call(this, {
      search: {
        value: '',
      },
      filters: {
        juice: {
          text: 'Orange',
          value: 'oj',
          isRequired: true,
        },
      },
      sort: {
        text: 'critical to healthy',
        value: 'health',
      },
    });

    const tags = this.element.querySelectorAll(
      '.cut-filter-bar-results .hds-tag'
    );

    assert.strictEqual(tags.length, 1);
    assert.strictEqual(tags[0].textContent.trim(), 'Orange');
    assert.dom('.cut-filter-bar-results > button').doesNotExist();
  });

  test('batch filters call apply after apply button is pressed', async function (assert) {
    const { onChange } = await setupTest.call(this);

    await click('[data-test-status-filter]');
    await click('[data-test-running-value]');
    await click('[data-test-critical-value]');

    assert.notOk(
      onChange.calledOnce,
      'Batch filters only trigger an update after clicking the apply button'
    );

    await click('.cut-filter-bar-apply-filter-button button');

    assert.ok(
      onChange.calledOnce,
      'Batch filter is applied after clicking the apply button'
    );

    let newConfig = onChange.getCall(0).args;
    assert.strictEqual(newConfig[0].filters.status.length, 2);
    assert.deepEqual(newConfig[0].filters, {
      status: [
        {
          text: 'Warning',
          value: 'warning',
        },
        {
          text: 'Critical',
          value: 'critical',
          isRequired: false,
        },
      ],
      juice: {
        text: 'Orange',
        value: 'oj',
        isRequired: true,
      },
    });
  });

  test('non-batch filters call apply immediately', async function (assert) {
    const { onChange } = await setupTest.call(this);

    await click('[data-test-type-filter]');

    assert.notOk(
      this.element.querySelector('.cut-filter-bar-apply-filter-button button'),
      'There should be no apply button on non-batch filters'
    );

    await click('[data-test-consul-value]');

    assert.ok(onChange.calledOnce);

    let newConfig = onChange.getCall(0).args;
    assert.deepEqual(
      newConfig[0].filters,
      {
        status: [
          {
            text: 'Running',
            value: 'running',
          },
          {
            text: 'Warning',
            value: 'warning',
          },
        ],
        juice: {
          text: 'Orange',
          value: 'oj',
          isRequired: true,
        },
        type: {
          text: 'Consul',
          value: 'consul',
          isRequired: false,
        },
      },
      'Type filter is updated with Consul'
    );

    await click('[data-test-nomad-value]');

    assert.ok(onChange.calledTwice);

    newConfig = onChange.getCall(1).args;
    assert.deepEqual(
      newConfig[0].filters,
      {
        status: [
          {
            text: 'Running',
            value: 'running',
          },
          {
            text: 'Warning',
            value: 'warning',
          },
        ],
        juice: {
          text: 'Orange',
          value: 'oj',
          isRequired: true,
        },
        type: {
          text: 'Nomad',
          value: 'nomad',
          isRequired: false,
        },
      },
      'Type filter is updated to be Nomad'
    );
  });

  test('sort calls the onChange with updated sort values', async function (assert) {
    const { onChange } = await setupTest.call(this);

    await click('[data-test-sort-button]');
    await click('[data-test-instance-count-value]');

    assert.ok(onChange.calledOnce);

    const newConfig = onChange.getCall(0).args;
    assert.deepEqual(
      newConfig[0].sort,
      {
        value: 'instances',
        text: 'Instance count',
      },
      'Sort is updated to be instance count'
    );
  });

  test('search updates the search values', async function (assert) {
    const { onChange } = await setupTest.call(this);

    await fillIn('[data-test-search]', 'wassup');

    assert.notOk(
      onChange.calledOnce,
      "Search waits to triggers a change until you submit it with 'Enter'"
    );

    await triggerKeyEvent('[data-test-search]', 'keyup', 'Enter');
    assert.ok(
      onChange.calledOnce,
      "Search triggers a change when you submit it with 'Enter'"
    );

    let newConfig = onChange.getCall(0).args;
    assert.deepEqual(
      newConfig[0].search,
      {
        value: 'wassup',
      },
      'Search is updated with the new search value'
    );

    await fillIn('[data-test-search]', '');
    assert.ok(
      onChange.calledTwice,
      'Search triggers a change when the value is returned to empty'
    );

    newConfig = onChange.getCall(1).args;
    assert.deepEqual(
      newConfig[0].search,
      {
        value: '',
      },
      'Search is updated with the new search value'
    );
  });
});
