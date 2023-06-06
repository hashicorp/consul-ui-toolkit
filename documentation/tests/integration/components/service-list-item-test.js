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
        kindName: 'Mesh gateway',
        instanceCount: 7,
        isImported: true,
        isPermissiveMTls: true,
        samenessGroup: 'sameness-group-1',
        connectedWithGateway: true,
      },
    };
    this.set('service', service);
    let { success, critical, warning } = service.metadata.healthCheck.instance;
    let healthCheckTotal = critical + success + warning;

    await render(
      hbs`
        <Cut::ListItem::Service @service={{this.service}}/>`
    );
    assert.true(cutService.renders, 'renders component');
    assert.deepEqual(cutService.title, 'Service 1', 'service name is set');
    assert.false(
      cutService.metadata.healthCheck.allHealthy,
      'no all healthy badge if some warning or critical present'
    );
    assert.false(
      cutService.metadata.healthCheck.success.renders,
      'no success healthcheck if some warning or critical present'
    );
    assert.true(
      cutService.metadata.healthCheck.critical.renders,
      'renders critical'
    );
    assert.true(
      cutService.metadata.healthCheck.critical.text.includes(
        `${critical}/${healthCheckTotal}`
      ),
      'renders correct number of critical checks'
    );

    assert.true(
      cutService.metadata.healthCheck.warning.renders,
      'renders warning'
    );
    assert.true(
      cutService.metadata.healthCheck.warning.text.includes(
        `${warning}/${healthCheckTotal}`
      ),
      'renders correct number of warning checks'
    );
    assert.true(cutService.metadata.kind.renders, 'renders kind name');
    assert.true(
      cutService.metadata.kind.text.includes(service.metadata.kindName),
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
      cutService.metadata.healthCheck.allHealthy,
      'present All Healthy badge cause no critical and warning checks'
    );
    assert.false(cutService.metadata.healthCheck.success.renders, 'success');
    assert.false(cutService.metadata.healthCheck.critical.renders, 'critical');
    assert.false(cutService.metadata.healthCheck.warning.renders, 'warning');
    assert.false(cutService.metadata.kind.renders, 'kind');
    assert.false(cutService.metadata.instanceCount.renders, 'instance count');
    assert.false(cutService.metadata.inMeshGateway.renders, 'mesh data');
    assert.false(cutService.metadata.isPermissiveMTls, 'permissive mTLS');
    assert.false(cutService.metadata.isImported, 'imported');
    assert.false(cutService.metadata.samenessGroup.renders, 'sameness group');
  });
});
