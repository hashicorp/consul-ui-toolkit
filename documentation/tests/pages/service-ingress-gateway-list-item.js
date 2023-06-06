/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { create, isPresent, isVisible, text } from 'ember-cli-page-object';

const listItemSelector = '[data-test-service-ingress-gateway-list-item]';
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
    kind: {
      renders: isPresent(`${listItemSelector} [data-test-service-kind]`),
      text: text(`${listItemSelector} [data-test-service-kind]`),
    },
    upstreamCount: {
      renders: isPresent(
        `${listItemSelector} [data-test-associated-service-count]`
      ),
      text: text(`${listItemSelector} [data-test-associated-service-count]`),
    },
  },
});
