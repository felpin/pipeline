# Changelog

## [Unreleased]

## [1.0.1] - 2019-08-13

### Fixed

- Move eslint packages to dependencies instead of devDepenedencies. It seems that CRA requires it. Since,
as said by [Dan Abramov](https://github.com/facebook/create-react-app/issues/1764#issuecomment-285082921)
the application has a build step, there is no difference between dependencies and devDependencies, so
it can be moved to dependencies without an impact on the final product.

## [1.0.0] - 2019-08-13

### Added

- This is the first release. Changes will be logged from now on.
