import { create, isPresent, isVisible, text } from 'ember-cli-page-object';

const listItemSelector = '[data-test-service-instance-list-item]';
export default create({
  renders: isPresent(listItemSelector),
  title: text(`${listItemSelector} [data-test-service-name]`),
  metadata: {
    healthCheck: {
      allHealthy: isVisible(
        `${listItemSelector} [data-test-health-check-all-healthy]`
      ),
      node: {
        success: {
          renders: isPresent(
            `${listItemSelector} [data-test-health-check-success="node"]`
          ),
          text: text(
            `${listItemSelector} [data-test-health-check-success="node"]`
          ),
        },
        critical: {
          renders: isPresent(
            `${listItemSelector} [data-test-health-check-critical="node"]`
          ),
          text: text(
            `${listItemSelector} [data-test-health-check-critical="node"]`
          ),
        },
        warning: {
          renders: isPresent(
            `${listItemSelector} [data-test-health-check-warning="node"]`
          ),
          text: text(
            `${listItemSelector} [data-test-health-check-warning="node"]`
          ),
        },
      },
      service: {
        success: {
          renders: isPresent(
            `${listItemSelector} [data-test-health-check-success="service"]`
          ),
          text: text(
            `${listItemSelector} [data-test-health-check-success="service"]`
          ),
        },
        critical: {
          renders: isPresent(
            `${listItemSelector} [data-test-health-check-critical="service"]`
          ),
          text: text(
            `${listItemSelector} [data-test-health-check-critical="service"]`
          ),
        },
        warning: {
          renders: isPresent(
            `${listItemSelector} [data-test-health-check-warning="service"]`
          ),
          text: text(
            `${listItemSelector} [data-test-health-check-warning="service"]`
          ),
        },
      },
    },
    inMeshGateway: {
      renders: isPresent(`${listItemSelector} [data-test-mesh]`),
      text: text(`${listItemSelector} [data-test-mesh]`),
    },
    tags: {
      renders: isPresent(`${listItemSelector} [data-test-tags]`),
      text: text(`${listItemSelector} [data-test-tags]`),
    },
    externalSource: {
      renders: isPresent(`${listItemSelector} [data-test-external-source]`),
      text: text(`${listItemSelector} [data-test-external-source]`),
    },
    servicePortAddress: {
      renders: isPresent(`${listItemSelector} [data-test-address]`),
      text: text(`${listItemSelector} [data-test-address]`),
    },
    serviceSocketPath: {
      renders: isPresent(`${listItemSelector} [data-test-socket]`),
      text: text(`${listItemSelector} [data-test-socket]`),
    },
    node: {
      renders: isPresent(`${listItemSelector} [data-test-node-name]`),
      text: text(`${listItemSelector} [data-test-node-name]`),
    },
  },
});
