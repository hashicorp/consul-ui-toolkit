/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import cutServiceTerminatingGateway from '../../pages/service-terminating-gateway-list-item';

module(
  'Integration | Component | cut/list-item/service-terminating-gateway',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it renders Cut::ListItem::ServiceTerminatingGateway with whole set of metadata', async function (assert) {
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
          connectedWithProxy: true,
          externalSource: 'kubernetes',
          tags: ['array', 'node'],
          kindName: 'terminating-gateway',
          linkedServiceCount: 5,
        },
      };
      this.set('service', service);
      const { critical, warning, success } =
        service.metadata.healthCheck.instance;
      let healthCheckTotal = critical + success + warning;

      await render(
        hbs`
            <Cut::ListItem::ServiceTerminatingGateway @service={{this.service}}/>`
      );
      assert.true(cutServiceTerminatingGateway.renders, 'renders component');
      assert.deepEqual(
        cutServiceTerminatingGateway.title,
        'Service 1',
        'service name is set'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.healthCheck.allHealthy,
        'no all healthy badge if some warning or critical present'
      );

      // health checks
      assert.false(
        cutServiceTerminatingGateway.metadata.healthCheck.success.renders,
        'no success badge if some warning or critical present'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.healthCheck.critical.renders,
        'renders critical'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.healthCheck.critical.text.includes(
          `${critical}/${healthCheckTotal}`
        ),
        'renders correct number of critical checks'
      );

      assert.true(
        cutServiceTerminatingGateway.metadata.healthCheck.warning.renders,
        'renders warning'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.healthCheck.warning.text.includes(
          `${warning}/${healthCheckTotal}`
        ),
        'renders correct number of warning checks'
      );

      assert.true(
        cutServiceTerminatingGateway.metadata.inMeshGateway.renders,
        'renders mesh message'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.externalSource.renders,
        'renders external source'
      );

      assert.true(
        cutServiceTerminatingGateway.metadata.externalSource.text.includes(
          service.metadata.externalSource
        ),
        'includes external source value in metadata'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.linkedServiceCount.renders,
        'renders linked service count'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.linkedServiceCount.text.includes(
          service.metadata.linkedServiceCount
        ),
        'renders linked service count text'
      );

      assert.true(
        cutServiceTerminatingGateway.metadata.kind.renders,
        'renders kind name'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.kind.text.includes(
          service.metadata.kindName
        ),
        'renders kind name text'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.tags.renders,
        'renders tags'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.tags.text.includes(
          service.metadata.tags.join(', ')
        ),
        'renders tags values to metadata'
      );
    });

    test('it renders Cut::ListItem::ServiceTerminatingGateway without metadata', async function (assert) {
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
            <Cut::ListItem::ServiceTerminatingGateway @service={{this.service}}/>`
      );
      assert.true(cutServiceTerminatingGateway.renders, 'renders');
      assert.deepEqual(
        cutServiceTerminatingGateway.title,
        'Service 1',
        'service name is set'
      );
      assert.true(
        cutServiceTerminatingGateway.metadata.healthCheck.allHealthy,
        'present All Healthy badge cause no critical and warning checks'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.healthCheck.success.renders,
        'does not render success'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.healthCheck.critical.renders,
        'does not render critical'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.healthCheck.warning.renders,
        'does not render warning'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.tags.renders,
        'does not render tags'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.kind.renders,
        'does not render kind name'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.linkedServiceCount.renders,
        'does not render linked service count'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.externalSource.renders,
        'does not render external source'
      );
      assert.false(
        cutServiceTerminatingGateway.metadata.inMeshGateway.renders,
        'does not render mesh gateway label'
      );
    });
  }
);
