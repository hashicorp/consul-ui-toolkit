# @hashicorp/consul-ui-toolkit

## 2.3.3

### Patch Changes

- 829f1ae: Upgrade @hashicorp/design-system-components to 2.13.0

## 2.3.2

### Patch Changes

- f4df22e: Update FilterBar results text on search to include searched text

## 2.3.1

### Patch Changes

- 3dacfed: Add text property to FilterBar.Sort type definition

## 2.3.0

### Minor Changes

- abd5443: Service list item now includes cluster ID, partition, and namespace info

### Patch Changes

- 9193963: Update list-item-template styling and add strict mtls badge to list item metadata

## 2.2.0

### Minor Changes

- 19cecc9: Add model/models/replace to `Cut::List::Pagination`
  Update type for replace & query

### Patch Changes

- 89c40db: Update filter-bar results text to show searching text if only search is applied
- 9b8499b: Upgrade @hashicorp/design-system-componens -> 2.12.1

## 2.1.1

### Patch Changes

- 7e5cb06: Remove utils reexport which was causing embroider errors

## 2.1.0

### Minor Changes

- a101b25: Service list item now displays an overall service health status

### Patch Changes

- 5ee2994: Upgrade @hashicorp/design-system-components to 2.11.0
- bbff69e: Update `<Cut::FilterBar::Search />` to use search as a value on the search input
- e191fb8: Update SERVICE_KIND to include all service kinds

## 2.0.0

### Major Changes

- 63f6893: Update pagination pagesize handler to always specify the current route when transitioning
  Update pagination routing to set separate query params for next or prev page
- 2c5af5f: Update where types are declared and how they are exported

### Minor Changes

- edad51f: Add @name argument to Cut::FilterBar and update default result text

### Patch Changes

- 93f689e: Pass through models, model on list-item to the HDS::Interactive component
- 9c6df91: Add cut-link class for link overrides
- 6fd15c9: Update default `Cut::FilterBar` results text when no count is passed in.

## 1.0.1

### Patch Changes

- 8e9dd2c: Fix the compilation of scss in the toolkit and upgrade typescript

## 1.0.0

### Major Changes

- 2fb974b: Rename list-item Label, Label2 to Section, SecondSection

### Minor Changes

- cbbeadf: Add Cut::FilterBar component
- d21d187: Add Service list item and Service instance list item
- 6f5a757: Add Cut::List component

### Patch Changes

- ee20fd3: Update service instance list item type styling
- 4aebe3a: Upgrade @hashicorp/design-system-component -> 2.10.0 and ember-cli-clipboard -> 1.0.0
- a6657d1: Upgrade @hashicorp/design-system-components.
- 2fb974b: fix: update copy-block cursor to be pointer
- e453db1: Update Service List Item types. Same overall type, just formatting changed.
- 9b9d230: Upgrade HDS
- 3c0d182: Upgrade @hashicorp/design-system-components -> 2.7.1

## 0.1.0

### Minor Changes

- b1ccd11: Add CopyBlock to toolkit
- be836f7: Add Cut::ListItem component
- 681a591: Add List item template component

### Patch Changes

- a0b4933: Update list-item component to use `li` element
  Update list-item to have default background color of surface-primary
- 658d2fd: Update rollup-ts and related dependencies
