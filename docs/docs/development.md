---
title: Development
id: development
---

## Building

To build run:

```bash
npm run build
```

We are enforcing size limits with [size-limit](https://github.com/ai/size-limit), so that we keep the cost of using
this library in check.

## Linting

We use eslint with [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint) as our linter
tool. To lint run:

```bash
npm run lint
npm run lint:fix
```

## Testing

We use [jest](https://jestjs.io/) as our test framework. To execute the entire test suite run:

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Documentation

We use [docusaurus](https://docusaurus.io/) as our documentation framework. To see the documentation in dev mode run:

```bash
npm run docs:watch
```

Before generating the documentation, we are injecting API markdown files created with [typedoc](https://typedoc.org/),
as a way to document the code per se.

## Changelog

We use [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) as our automated
changelog/release notes generator. To generate a changelog file run:

```bash
npm run changelog
```

We don't commit changelog files though and this should only be used for testing purposes. Partial changelogs will
be transparently used as the description of new github releases, when publishing a version.

## Deploying & Publishing

To publish a new package on [NPM](http://npmjs.com) run:

```bash
npm run release
```

Besides publishing the package, the command above will build the package, bump its version, commit that, tag the
new version, push commits/tags to github and then create a github release. This process is automatically handled by
[release-it](https://github.com/release-it/release-it). To publish the documentation on github pages run:

```bash
npm run release:docs
```

It might take some time for github pages to update its caches once docs are deployed, so be patient.

## License
Copyright 2016 KAYAK Germany, GmbH

Licensed under the Apache License, Version 2.0 (the “License”); you may not use this file except in compliance
with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
the specific language governing permissions and limitations under the License.

Crafted with ♥ in Berlin.
