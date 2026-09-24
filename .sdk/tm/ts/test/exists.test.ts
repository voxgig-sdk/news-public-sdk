
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NewsPublicSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NewsPublicSDK.test()
    equal(testsdk instanceof NewsPublicSDK, true,
      'NewsPublicSDK.test() must return a client synchronously')
  })

})
