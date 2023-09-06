/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import cutService from '../../pages/service-list-item';

module('Integration | Component | cut/list-item/service', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  // Service list item
  test('it renders Cut::ListItem::Service with whole set of metadata', async function (assert) {
    const service = {
      name: 'Service 1',
      metadata: {
        healthCheck: {
          instance: {
            success: 4,
            critical: 2,
            warning: 1,
          },
        },
        kind: 'mesh-gateway',
        instanceCount: 7,
        linkedServiceCount: 4,
        upstreamCount: 4,
        isImported: true,
        isPermissiveMTls: true,
        samenessGroup: 'sameness-group-1',
        connectedWithGateway: true,
        externalSource: 'vault',
        tags: ['tag', 'service'],
      },
    };
    this.set('service', service);

    await render(
      hbs`
        <Cut::ListItem::Service @service={{this.service}}/>`
    );
    assert.true(cutService.renders, 'renders component');
    assert.deepEqual(cutService.title, 'Service 1', 'service name is set');
    assert.false(
      cutService.metadata.healthCheck.healthy.renders,
      'healthy status badge does not render if there are warning or critical healthchecks'
    );
    assert.true(
      cutService.metadata.healthCheck.critical.renders,
      'renders critical status badge'
    );
    assert.false(
      cutService.metadata.healthCheck.warning.renders,
      'warning status badge does not render if there are critical healthchecks'
    );

    assert.true(cutService.metadata.kind.renders, 'renders kind name');
    assert.true(
      cutService.metadata.kind.text
        .toLowerCase()
        .includes(service.metadata.kind.split('-')[0]),
      'renders kind'
    );
    assert.true(
      cutService.metadata.instanceCount.renders,
      'renders instance count'
    );
    assert.true(
      cutService.metadata.instanceCount.text.includes(
        service.metadata.instanceCount
      ),
      'renders number of instances'
    );

    assert.false(
      cutService.metadata.linkedServiceCount.renders,
      'does not render linked service count'
    );

    assert.false(
      cutService.metadata.upstreamCount.renders,
      'does not render upstream count'
    );

    assert.true(
      cutService.metadata.inMeshGateway.renders,
      'renders mesh message'
    );
    assert.true(
      cutService.metadata.isPermissiveMTls,
      'renders permissive mtls'
    );
    assert.true(cutService.metadata.isImported, 'renders imported');
    assert.true(
      cutService.metadata.samenessGroup.renders,
      'renders sameness group'
    );
    assert.true(
      cutService.metadata.samenessGroup.text.includes(
        service.metadata.samenessGroup
      ),
      'renders sameness group text'
    );
    assert.true(
      cutService.metadata.externalSource.renders,
      'renders external source'
    );

    assert.true(
      cutService.metadata.externalSource.text
        .toLowerCase()
        .includes(service.metadata.externalSource),
      'includes external source value in metadata'
    );
    assert.true(cutService.metadata.tags.renders, 'renders tags');
    assert.true(
      cutService.metadata.tags.text.includes(service.metadata.tags.join(', ')),
      'renders tags values to metadata'
    );
  });

  test('it does render the kind if it does not find a kindName', async function (assert) {
    const service = {
      name: 'Service 1',
      metadata: {
        healthCheck: {
          instance: {
            success: 4,
            critical: 2,
            warning: 1,
          },
        },
        kind: 'typical',
        instanceCount: 7,
        linkedServiceCount: 4,
        upstreamCount: 4,
        isImported: true,
        isPermissiveMTls: true,
        samenessGroup: 'sameness-group-1',
        connectedWithGateway: true,
        externalSource: 'vault',
        tags: ['tag', 'service'],
      },
    };
    this.set('service', service);

    await render(
      hbs`
        <Cut::ListItem::Service @service={{this.service}}/>`
    );

    assert.false(cutService.metadata.kind.renders, 'kind');
  });

  test('it renders Cut::ListItem::Service without metadata', async function (assert) {
    const service = {
      name: 'Service 1',
      metadata: {
        healthCheck: {
          instance: {},
        },
      },
    };
    this.set('service', service);

    await render(
      hbs`
        <Cut::ListItem::Service @service={{this.service}}/>`
    );
    assert.true(cutService.renders, 'renders');
    assert.deepEqual(cutService.title, 'Service 1', 'service name is set');
    assert.true(
      cutService.metadata.healthCheck.healthy.renders,
      'renders healthy status badge'
    );

    assert.false(cutService.metadata.healthCheck.critical.renders, 'critical');
    assert.false(cutService.metadata.healthCheck.warning.renders, 'warning');
    assert.false(cutService.metadata.kind.renders, 'kind');
    assert.false(cutService.metadata.instanceCount.renders, 'instance count');
    assert.false(
      cutService.metadata.linkedServiceCount.renders,
      'linked service count'
    );
    assert.false(cutService.metadata.upstreamCount.renders, 'upstream count');
    assert.false(cutService.metadata.inMeshGateway.renders, 'mesh data');
    assert.false(cutService.metadata.isPermissiveMTls, 'permissive mTLS');
    assert.false(cutService.metadata.isImported, 'imported');
    assert.false(cutService.metadata.samenessGroup.renders, 'sameness group');
    assert.false(
      cutService.metadata.externalSource.renders,
      'does not render external source'
    );
    assert.false(cutService.metadata.tags.renders, 'does not render tags');
  });
  test('it renders upstream count instead of instance count/linked service count for kind ingress-gateway', async function (assert) {
    const service = {
      name: 'Service 1',
      metadata: {
        healthCheck: {
          instance: {},
        },
        kind: 'ingress-gateway',
        upstreamCount: 5,
        // adding intentionally to check if it will be rendered
        instanceCount: 3,
        linkedServiceCount: 4,
      },
    };
    this.set('service', service);

    await render(
      hbs`
        <Cut::ListItem::Service @service={{this.service}}/>`
    );

    assert.true(
      cutService.metadata.upstreamCount.renders,
      'renders upstream count'
    );

    assert.false(
      cutService.metadata.instanceCount.renders,
      'does not render instance count'
    );

    assert.false(
      cutService.metadata.linkedServiceCount.renders,
      'does not render linked service count'
    );
  });
  test('it renders linked service count instead of instance count/upstream count for kind terminating-gateway', async function (assert) {
    const service = {
      name: 'Service 1',
      metadata: {
        healthCheck: {
          instance: {},
        },
        kind: 'terminating-gateway',
        linkedServiceCount: 4,
        // adding intentionally to check if it will be rendered
        instanceCount: 3,
        upstreamCount: 5,
      },
    };
    this.set('service', service);

    await render(
      hbs`
        <Cut::ListItem::Service @service={{this.service}}/>`
    );

    assert.true(
      cutService.metadata.linkedServiceCount.renders,
      'renders linked service count'
    );

    assert.false(
      cutService.metadata.upstreamCount.renders,
      'does not render upstream count'
    );

    assert.false(
      cutService.metadata.instanceCount.renders,
      'does not render instance count'
    );
  });
});
