import { create, isPresent, isVisible, text } from 'ember-cli-page-object';

const listItemSelector = '[data-test-service-list-item]';
export default create({
  renders: isPresent(listItemSelector),
  title: text(`${listItemSelector} [data-test-service-name]`),
  metadata: {
    healthCheck: {
      allHealthy: isVisible(
        `${listItemSelector} [data-test-health-check-all-healthy]`
      ),
      success: {
        renders: isPresent(
          `${listItemSelector} [data-test-health-check-success]`
        ),
        text: text(`${listItemSelector} [data-test-health-check-success]`),
      },
      critical: {
        renders: isPresent(
          `${listItemSelector} [data-test-health-check-critical]`
        ),
        text: text(`${listItemSelector} [data-test-health-check-critical]`),
      },
      warning: {
        renders: isPresent(
          `${listItemSelector} [data-test-health-check-warning]`
        ),
        text: text(`${listItemSelector} [data-test-health-check-warning]`),
      },
    },
    kind: {
      renders: isPresent(`${listItemSelector} [data-test-service-kind]`),
      text: text(`${listItemSelector} [data-test-service-kind]`),
    },
    instanceCount: {
      renders: isPresent(
        `${listItemSelector} [data-test-associated-instance-count]`
      ),
      text: text(`${listItemSelector} [data-test-associated-instance-count]`),
    },
    inMeshGateway: {
      renders: isPresent(`${listItemSelector} [data-test-mesh]`),
      text: text(`${listItemSelector} [data-test-mesh]`),
    },
    isPermissiveMTls: isPresent(
      `${listItemSelector} [data-test-permissive-mtls]`
    ),
    samenessGroup: {
      renders: isPresent(`${listItemSelector} [data-test-sameness-group]`),
      text: text(`${listItemSelector} [data-test-sameness-group]`),
    },
    isImported: isPresent(`${listItemSelector} [data-test-imported]`),
  },
});
