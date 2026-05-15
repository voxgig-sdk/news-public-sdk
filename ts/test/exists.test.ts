
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NewsPublicSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NewsPublicSDK.test()
    equal(null !== testsdk, true)
  })

})
