# How To Contribute

## Installation

- `git clone git@github.com:hashicorp/consul-ui-toolkit.git`
- `cd consul-ui-toolkit`
- `yarn install`

## Linting

- `yarn lint`
- `yarn lint:fix`

### Glinting
- `yarn lint:types` to run linter for templates to check the types

Newly added components and helpers have to be registered in `@glint/environment-ember-loose/registry`, see details in: [Template registry](https://typed-ember.gitbook.io/glint/using-glint/ember/template-registry#components)
Some addons, which don't have the helpers and components registered, might be added to the project registry( see `types/*` folder).
[Addon dependencies](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#typing-your-dependencies)

## Building the addon

- `cd toolkit`
- `yarn build`

## Running tests

- `cd documentation`
- `yarn test` – Runs the test suite on the current Ember version
- `yarn test:watch` – Runs the test suite in "watch mode"
- 
## Testing in dependent projects 

### Publishing toolkit locally
- from root `publish:local:toolkit`
- or `cd toolkit` and `yarn publish:local` – Publishing `@hashocorp/consul-ui-toolkit` to local `.yalc` store
- from the dependent project `yalc link @hashocorp/consul-ui-toolkit`

### Remove toolkit package from local .yalc store
- from root `cleanup:local:toolkit`
- or `cd toolkit` and `yarn cleanup:local` – Removing `@hashocorp/consul-ui-toolkit` from local `.yalc` store
- 
## Running the test application

- `cd documentation`
- `yarn start`
- Visit the test application at [http://localhost:4200](http://localhost:4200).

## Adding changelog entries

The toolkit uses [changesets](https://github.com/changesets/changesets) to manage versioning, releases, and updating the changelog. By default, each pull request expects you to include a new changeset to represent if the change is a major/minor/patch bump and a description of what the change is which will be included in the changelog upon release. If your change doesn't require a changelog update you can apply the `pr/no-changeset` label to skip the [changelog ci check](.github/workflows/changelog-check.yml).

Run the following command use the changesets cli tool to add a new changeset to your branch:

```
yarn changeset
```

The [changesets release action](.github/workflows/release.yml) manages updating a versioning branch and PR that can be merged to do the release and publish the toolkit to NPM.

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
