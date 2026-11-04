
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CoworkingviewSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CoworkingviewSDK.test()
    equal(testsdk instanceof CoworkingviewSDK, true,
      'CoworkingviewSDK.test() must return a client synchronously')
  })

})
