
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MunicipalFinanceSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MunicipalFinanceSDK.test()
    equal(null !== testsdk, true)
  })

})
