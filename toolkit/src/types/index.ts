/**
 * Copyright (c) HashiCorp, Inc.
 */

export type * from '../components/cut/list-item/types';
export type * from '../components/cut/filter-bar/types';
export type * from '../components/cut/list/types';
export type * from '../components/cut/copy-block/types';
export type * from '../components/cut/metadata/types';
export type * from '../components/cut/text-with-icon/types';

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
};
