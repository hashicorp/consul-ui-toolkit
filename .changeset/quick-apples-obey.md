---
"@hashicorp/consul-ui-toolkit": major
---

Upgrade dependencies and add ember-source as a peer dependency

*Breaking:* Adds `ember-source "^3.28.0 || ^4.0.0 || >=5.0.0"` as a peer dependency. This was required by ember-concurrency, and shouldn't be a problem for most apps consuming this as they all will have ember-source. Labelling it as a major changeg though as it does add a requirement. The toolkit does not itself have ember-source as it's an embroider addon.
*Breaking:* Updates `@hashicorp/design-system-components` peerDependency to be `^3.4.0`