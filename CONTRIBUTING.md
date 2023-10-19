# How To Contribute

## Installation

- `git clone git@github.com:hashicorp/consul-ui-toolkit.git`
- `cd consul-ui-toolkit`
- `yarn install`

## Linting

- `yarn lint`
- `yarn lint:fix`

## Building the addon

- `cd toolkit`
- `yarn build`

## Running tests

- `cd documentation`
- `yarn test` – Runs the test suite on the current Ember version
- `yarn test:watch` – Runs the test suite in "watch mode"

## Testing in dependent projects

### Publishing toolkit locally

- from root `publish:local:toolkit`
- or `cd toolkit` and `yarn publish:local` – Publishing `@hashicorp/consul-ui-toolkit` to local `.yalc` store
- from the dependent project `yalc link @hashicorp/consul-ui-toolkit`
  - in HCP you will need to run `yalc link @hashicorp/consul-ui-toolkit` in both the `hcp` folder and the `engines/consul` folder

### Remove toolkit package from local .yalc store

- from root `cleanup:local:toolkit`
- or `cd toolkit` and `yarn cleanup:local` – Removing `@hashicorp/consul-ui-toolkit` from local `.yalc` store
- Run `yalc remove @hashicorp/consul-ui-toolkit` or `yalc remove --all` to remove the symlinks in any dependent project that currently has a `yalc link` set up.

## Running the test application

- Run `yarn watch:toolkit` - This will automatically detect changes in the toolkit and build it to be consumed by the documentation app.
- In a separate terminal, run `yarn start:documentation` to start the documentations apps server
- Visit the test application at [http://localhost:4200](http://localhost:4200).

## Adding changelog entries

The toolkit uses [changesets](https://github.com/changesets/changesets) to manage versioning, releases, and updating the changelog. By default, each pull request expects you to include a new changeset to represent if the change is a major/minor/patch bump and a description of what the change is which will be included in the changelog upon release. If your change doesn't require a changelog update you can apply the `pr/no-changeset` label to skip the [changelog ci check](.github/workflows/changelog-check.yml).

Run the following command use the changesets cli tool to add a new changeset to your branch:

```
yarn changeset
```

The [changesets release action](.github/workflows/release.yml) manages updating a versioning branch and PR that can be merged to do the release and publish the toolkit to NPM.

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
