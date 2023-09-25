/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { create, isPresent, text } from 'ember-cli-page-object';

const listItemSelector = '[data-test-service-list-item]';
export default create({
  renders: isPresent(listItemSelector),
  title: text(`${listItemSelector} [data-test-service-name]`),
  clusterPath: {
    renders: isPresent(`${listItemSelector} [data-test-service-cluster-path]`),
    text: text(`${listItemSelector} [data-test-service-cluster-path]`),
  },
  metadata: {
    healthCheck: {
      healthy: {
        renders: isPresent(
          `${listItemSelector} [data-test-service-health-check-healthy]`
        ),
        text: text(
          `${listItemSelector} [data-test-service-health-check-healthy]`
        ),
      },
      critical: {
        renders: isPresent(
          `${listItemSelector} [data-test-service-health-check-critical]`
        ),
        text: text(
          `${listItemSelector} [data-test-service-health-check-critical]`
        ),
      },
      warning: {
        renders: isPresent(
          `${listItemSelector} [data-test-service-health-check-warning]`
        ),
        text: text(
          `${listItemSelector} [data-test-service-health-check-warning]`
        ),
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
    linkedServiceCount: {
      renders: isPresent(
        `${listItemSelector} [data-test-associated-service-count]`
      ),
      text: text(`${listItemSelector} [data-test-associated-service-count]`),
    },
    upstreamCount: {
      renders: isPresent(
        `${listItemSelector} [data-test-associated-upstream-count]`
      ),
      text: text(`${listItemSelector} [data-test-associated-upstream-count]`),
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
    externalSource: {
      renders: isPresent(`${listItemSelector} [data-test-external-source]`),
      text: text(`${listItemSelector} [data-test-external-source]`),
    },
    tags: {
      renders: isPresent(`${listItemSelector} [data-test-tags]`),
      text: text(`${listItemSelector} [data-test-tags]`),
    },
  },
});
