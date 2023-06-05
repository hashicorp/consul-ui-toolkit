/**
 * Copyright (c) HashiCorp, Inc.
 */

export type ExternalSource =
  | 'kubernetes'
  | 'terraform'
  | 'nomad'
  | 'consul'
  | 'consul-api-gateway'
  | 'vault'
  | 'aws'
  | 'aws-iam'
  | 'lambda';

export enum EXTERNAL_SOURCE_ICON_MAPPING {
  kubernetes = 'kubernetes-color',
  terraform = 'terraform-color',
  nomad = 'nomad-color',
  consul = 'consul-color',
  'consul-api-gateway' = 'consul-color',
  vault = 'vault-color',
  aws = 'aws-color',
  'aws-iam' = 'aws-color',
  lambda = 'aws-lambda-color',
}

export interface HealthCheck {
  success: number | undefined;
  warning: number | undefined;
  critical: number | undefined;
}
