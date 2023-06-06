/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import cutServiceIngressGateway from '../../pages/service-ingress-gateway-list-item';

module(
  'Integration | Component | cut/list-item/service-ingress-gateway',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it renders Cut::ListItem::ServiceIngressGateway with whole set of metadata', async function (assert) {
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
          kindName: 'ingress-gateway',
          upstreamCount: 5,
        },
      };
      this.set('service', service);
      const { critical, warning, success } =
        service.metadata.healthCheck.instance;
      let healthCheckTotal = critical + success + warning;

      await render(
        hbs`
            <Cut::ListItem::ServiceIngressGateway @service={{this.service}}/>`
      );
      assert.true(cutServiceIngressGateway.renders, 'renders component');
      assert.deepEqual(
        cutServiceIngressGateway.title,
        'Service 1',
        'service name is set'
      );
      assert.false(
        cutServiceIngressGateway.metadata.healthCheck.allHealthy,
        'no all healthy badge if some warning or critical present'
      );

      // health checks
      assert.false(
        cutServiceIngressGateway.metadata.healthCheck.success.renders,
        'no success badge if some warning or critical present'
      );
      assert.true(
        cutServiceIngressGateway.metadata.healthCheck.critical.renders,
        'renders critical'
      );
      assert.true(
        cutServiceIngressGateway.metadata.healthCheck.critical.text.includes(
          `${critical}/${healthCheckTotal}`
        ),
        'renders correct number of critical checks'
      );

      assert.true(
        cutServiceIngressGateway.metadata.healthCheck.warning.renders,
        'renders warning'
      );
      assert.true(
        cutServiceIngressGateway.metadata.healthCheck.warning.text.includes(
          `${warning}/${healthCheckTotal}`
        ),
        'renders correct number of warning checks'
      );

      assert.true(
        cutServiceIngressGateway.metadata.inMeshGateway.renders,
        'renders mesh message'
      );
      assert.true(
        cutServiceIngressGateway.metadata.externalSource.renders,
        'renders external source'
      );

      assert.true(
        cutServiceIngressGateway.metadata.externalSource.text.includes(
          service.metadata.externalSource
        ),
        'includes external source value in metadata'
      );
      assert.true(
        cutServiceIngressGateway.metadata.upstreamCount.renders,
        'renders upstream count'
      );
      assert.true(
        cutServiceIngressGateway.metadata.upstreamCount.text.includes(
          service.metadata.upstreamCount
        ),
        'renders upstream count text'
      );

      assert.true(
        cutServiceIngressGateway.metadata.kind.renders,
        'renders kind name'
      );
      assert.true(
        cutServiceIngressGateway.metadata.kind.text.includes(
          service.metadata.kindName
        ),
        'renders kind name text'
      );
      assert.true(
        cutServiceIngressGateway.metadata.tags.renders,
        'renders tags'
      );
      assert.true(
        cutServiceIngressGateway.metadata.tags.text.includes(
          service.metadata.tags.join(', ')
        ),
        'renders tags values to metadata'
      );
    });

    test('it renders Cut::ListItem::ServiceIngressGateway without metadata', async function (assert) {
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
            <Cut::ListItem::ServiceIngressGateway @service={{this.service}}/>`
      );
      assert.true(cutServiceIngressGateway.renders, 'renders');
      assert.deepEqual(
        cutServiceIngressGateway.title,
        'Service 1',
        'service name is set'
      );
      assert.true(
        cutServiceIngressGateway.metadata.healthCheck.allHealthy,
        'present All Healthy badge cause no critical and warning checks'
      );
      assert.false(
        cutServiceIngressGateway.metadata.healthCheck.success.renders,
        'does not render success'
      );
      assert.false(
        cutServiceIngressGateway.metadata.healthCheck.critical.renders,
        'does not render critical'
      );
      assert.false(
        cutServiceIngressGateway.metadata.healthCheck.warning.renders,
        'does not render warning'
      );
      assert.false(
        cutServiceIngressGateway.metadata.tags.renders,
        'does not render tags'
      );
      assert.false(
        cutServiceIngressGateway.metadata.kind.renders,
        'does not render kind name'
      );
      assert.false(
        cutServiceIngressGateway.metadata.upstreamCount.renders,
        'does not render upstream count'
      );
      assert.false(
        cutServiceIngressGateway.metadata.externalSource.renders,
        'does not render external source'
      );
      assert.false(
        cutServiceIngressGateway.metadata.inMeshGateway.renders,
        'does not render mesh gateway label'
      );
    });
  }
);
