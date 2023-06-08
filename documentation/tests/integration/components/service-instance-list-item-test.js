/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, resetOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import cutServiceInstance from '../../pages/service-instance-list-item';

module(
  'Integration | Component | cut/list-item/service-instance',
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.afterEach(() => {
      resetOnerror();
    });

    test('it renders Cut::ListItem::ServiceInstance with whole set of metadata', async function (assert) {
      const service = {
        name: 'Service 1',
        metadata: {
          healthCheck: {
            node: {
              success: 4,
              critical: 2,
              warning: 1,
            },
            service: {
              success: 3,
              critical: 5,
              warning: 2,
            },
          },
          connectedWithProxy: true,
          node: 'node-1',
          externalSource: 'kubernetes',
          servicePortAddress: '8000',
          serviceSocketPath: '8.8.8.8',
          tags: ['array', 'node'],
        },
      };
      this.set('service', service);
      const nodeHealthCheck = service.metadata.healthCheck.node;
      const serviceHealthCheck = service.metadata.healthCheck.service;
      let serviceHealthCheckTotal =
        serviceHealthCheck.critical +
        serviceHealthCheck.success +
        serviceHealthCheck.warning;
      let nodeHealthCheckTotal =
        nodeHealthCheck.critical +
        nodeHealthCheck.success +
        nodeHealthCheck.warning;

      await render(
        hbs`
            <Cut::ListItem::ServiceInstance @service={{this.service}}/>`
      );
      assert.true(cutServiceInstance.renders, 'renders component');
      assert.deepEqual(
        cutServiceInstance.title,
        'Service 1',
        'service name is set'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.allHealthy,
        'no all healthy badge if some warning or critical in node/service present'
      );

      // service checks
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.success.renders,
        'no success service healthcheck if some warning or critical present'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.service.critical.renders,
        'renders service critical'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.service.critical.text.includes(
          `${serviceHealthCheck.critical}/${serviceHealthCheckTotal}`
        ),
        'renders correct number of critical service checks'
      );

      assert.true(
        cutServiceInstance.metadata.healthCheck.service.warning.renders,
        'renders service warning'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.service.warning.text.includes(
          `${serviceHealthCheck.warning}/${serviceHealthCheckTotal}`
        ),
        'renders correct number of warning service checks'
      );

      // node checks
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.success.renders,
        'no success node healthcheck if some warning or critical present'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.node.critical.renders,
        'renders node critical'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.node.critical.text.includes(
          `${nodeHealthCheck.critical}/${nodeHealthCheckTotal}`
        ),
        'renders correct number of critical node checks'
      );

      assert.true(
        cutServiceInstance.metadata.healthCheck.node.warning.renders,
        'renders node warning'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.node.warning.text.includes(
          `${nodeHealthCheck.warning}/${nodeHealthCheckTotal}`
        ),
        'renders correct number of warning node checks'
      );

      assert.true(
        cutServiceInstance.metadata.inMeshGateway.renders,
        'renders mesh message'
      );
      assert.true(
        cutServiceInstance.metadata.externalSource.renders,
        'renders external source'
      );

      assert.true(
        cutServiceInstance.metadata.externalSource.text
          .toLowerCase()
          .includes(service.metadata.externalSource),
        'includes external source value in metadata'
      );
      assert.true(
        cutServiceInstance.metadata.node.renders,
        'renders node name'
      );
      assert.true(
        cutServiceInstance.metadata.node.text.includes(service.metadata.node),
        'renders node name text'
      );

      assert.true(
        cutServiceInstance.metadata.servicePortAddress.renders,
        'renders service port address'
      );
      assert.true(
        cutServiceInstance.metadata.servicePortAddress.text.includes(
          service.metadata.servicePortAddress
        ),
        'renders service port address text'
      );
      assert.false(
        cutServiceInstance.metadata.serviceSocketPath.renders,
        'does not render service socket path if service port address presented'
      );
      assert.true(cutServiceInstance.metadata.tags.renders, 'renders tags');
      assert.true(
        cutServiceInstance.metadata.tags.text.includes(
          service.metadata.tags.join(', ')
        ),
        'renders tags values to metadata'
      );
    });

    test('it renders Cut::ListItem::ServiceInstance without metadata', async function (assert) {
      const service = {
        name: 'Service 1',
        metadata: {
          healthCheck: {
            node: {},
            service: {},
          },
        },
      };
      this.set('service', service);

      await render(
        hbs`
            <Cut::ListItem::ServiceInstance @service={{this.service}}/>`
      );
      assert.true(cutServiceInstance.renders, 'renders');
      assert.deepEqual(
        cutServiceInstance.title,
        'Service 1',
        'service name is set'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.allHealthy,
        'present All Healthy badge cause no critical and warning checks'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.success.renders,
        'does not render service success'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.critical.renders,
        'does not render service critical'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.warning.renders,
        'does not render service warning'
      );

      assert.false(
        cutServiceInstance.metadata.healthCheck.node.success.renders,
        'does not render node success'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.critical.renders,
        'does not render node critical'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.warning.renders,
        'does not render node warning'
      );
      assert.false(
        cutServiceInstance.metadata.tags.renders,
        'does not render tags'
      );
      assert.false(
        cutServiceInstance.metadata.node.renders,
        'does not render node name'
      );
      assert.false(
        cutServiceInstance.metadata.serviceSocketPath.renders,
        'does not render service socket'
      );
      assert.false(
        cutServiceInstance.metadata.servicePortAddress.renders,
        'does not render service port address'
      );
      assert.false(
        cutServiceInstance.metadata.externalSource.renders,
        'does not render external source'
      );
      assert.false(
        cutServiceInstance.metadata.inMeshGateway.renders,
        'does not render mesh gateway label'
      );
    });

    test('it renders all healthy if no critical or warning service and node checks', async function (assert) {
      const service = {
        name: 'Service 1',
        metadata: {
          healthCheck: {
            node: {
              success: 4,
              critical: 0,
              warning: 0,
            },
            service: {
              success: 3,
              critical: 0,
              warning: 0,
            },
          },
        },
      };
      this.set('service', service);

      await render(
        hbs`
            <Cut::ListItem::ServiceInstance @service={{this.service}}/>`
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.allHealthy,
        'renders all healthy badge'
      );

      // service checks
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.success.renders,
        'does not render service success'
      );

      assert.false(
        cutServiceInstance.metadata.healthCheck.service.warning.renders,
        'does not render service warning'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.critical.renders,
        'does not render service critical'
      );

      // node checks
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.success.renders,
        'does not render node success'
      );

      assert.false(
        cutServiceInstance.metadata.healthCheck.node.warning.renders,
        'does not render node warning'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.critical.renders,
        'does not render node critical'
      );
    });

    test('it renders success badge for services if some nodes are not success', async function (assert) {
      const service = {
        name: 'Service 1',
        metadata: {
          healthCheck: {
            node: {
              success: 4,
              critical: 1,
              warning: 0,
            },
            service: {
              success: 3,
              critical: 0,
              warning: 0,
            },
          },
        },
      };

      const serviceHealthChecks = service.metadata.healthCheck.service;
      const serviceHealthChecksTotal =
        serviceHealthChecks.critical +
        serviceHealthChecks.warning +
        serviceHealthChecks.success;

      this.set('service', service);

      await render(
        hbs`
            <Cut::ListItem::ServiceInstance @service={{this.service}}/>`
      );

      assert.false(
        cutServiceInstance.metadata.healthCheck.allHealthy,
        'does not render all healthy badge'
      );

      // service checks
      assert.true(
        cutServiceInstance.metadata.healthCheck.service.success.renders,
        'render service success'
      );

      assert.true(
        cutServiceInstance.metadata.healthCheck.service.success.text.includes(
          `${service.metadata.healthCheck.service.success}/${serviceHealthChecksTotal}`
        ),
        'render service success badge with count details'
      );

      assert.false(
        cutServiceInstance.metadata.healthCheck.service.warning.renders,
        'does not render service warning'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.service.critical.renders,
        'does not render service critical'
      );

      // node checks
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.success.renders,
        'does not render node success'
      );
      assert.false(
        cutServiceInstance.metadata.healthCheck.node.warning.renders,
        'does not render node critical'
      );
      assert.true(
        cutServiceInstance.metadata.healthCheck.node.critical.renders,
        'renders node critical'
      );
    });

    test('it renders service socket path if no service port address passed', async function (assert) {
      const service = {
        name: 'Service 1',
        metadata: {
          healthCheck: {
            node: {},
            service: {},
          },
          serviceSocketPath: '/eq/222',
        },
      };
      this.set('service', service);

      await render(
        hbs`
            <Cut::ListItem::ServiceInstance @service={{this.service}}/>`
      );

      assert.true(
        cutServiceInstance.metadata.serviceSocketPath.renders,
        'renders service socket path'
      );

      assert.true(
        cutServiceInstance.metadata.serviceSocketPath.text.includes(
          service.metadata.serviceSocketPath
        ),
        'renders service socket path text in metadata'
      );

      assert.false(
        cutServiceInstance.metadata.servicePortAddress.renders,
        'does not render service port address'
      );
    });
  }
);
