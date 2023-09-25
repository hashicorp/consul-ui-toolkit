/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { create, isPresent, text } from 'ember-cli-page-object';

const listItemSelector = '[data-test-service-list-item]';
export default create({
  scope: listItemSelector,
  renders: isPresent(),
  title: text(`[data-test-service-name]`),
  clusterPath: {
    renders: isPresent(`[data-test-service-cluster-path]`),
    text: text(`[data-test-service-cluster-path]`),
  },
  metadata: {
    healthCheck: {
      healthy: {
        renders: isPresent(`[data-test-service-health-check-healthy]`),
        text: text(`[data-test-service-health-check-healthy]`),
      },
      critical: {
        renders: isPresent(`[data-test-service-health-check-critical]`),
        text: text(`[data-test-service-health-check-critical]`),
      },
      warning: {
        renders: isPresent(`[data-test-service-health-check-warning]`),
        text: text(`[data-test-service-health-check-warning]`),
      },
    },
    kind: {
      renders: isPresent(`[data-test-service-kind]`),
      text: text(`[data-test-service-kind]`),
    },
    instanceCount: {
      renders: isPresent(`[data-test-associated-instance-count]`),
      text: text(`[data-test-associated-instance-count]`),
    },
    linkedServiceCount: {
      renders: isPresent(`[data-test-associated-service-count]`),
      text: text(`[data-test-associated-service-count]`),
    },
    upstreamCount: {
      renders: isPresent(`[data-test-associated-upstream-count]`),
      text: text(`[data-test-associated-upstream-count]`),
    },
    inMeshGateway: {
      renders: isPresent(`[data-test-mesh]`),
      text: text(`[data-test-mesh]`),
    },
    isPermissiveMTls: isPresent(`[data-test-permissive-mtls]`),
    isStrictMTls: isPresent(`[data-test-strict-mtls]`),
    samenessGroup: {
      renders: isPresent(`[data-test-sameness-group]`),
      text: text(`[data-test-sameness-group]`),
    },
    isImported: isPresent(`[data-test-imported]`),
    externalSource: {
      renders: isPresent(`[data-test-external-source]`),
      text: text(`[data-test-external-source]`),
    },
    tags: {
      renders: isPresent(`[data-test-tags]`),
      text: text(`[data-test-tags]`),
    },
  },
});
