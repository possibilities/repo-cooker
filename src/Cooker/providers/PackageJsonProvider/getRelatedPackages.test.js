import { config } from 'test-utils'
/* eslint-env mocha */
import assert from 'test-utils/assert'

import { getRelatedPackages as getRelatedPackagesFactory } from './getRelatedPackages'

it('should get related packages by package', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/commis').then(relatedPackages => {
    assert.deepEqual(relatedPackages, ['@repo-cooker-test/poissonier'], done)
  })
})

it('should not use devDependencies', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/poissonier').then(relatedPackages => {
    assert.deepEqual(relatedPackages, [], done)
  })
})

it('should get read peerDependencies', function(done) {
  const getRelatedPackages = getRelatedPackagesFactory(config)

  getRelatedPackages('@repo-cooker-test/pastry-chef').then(relatedPackages => {
    assert.deepEqual(relatedPackages, ['@repo-cooker-test/sous-chef'], done)
  })
})
