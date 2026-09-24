
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MunicipalFinanceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MunicipalFinanceSDK.test()
    equal(testsdk instanceof MunicipalFinanceSDK, true,
      'MunicipalFinanceSDK.test() must return a client synchronously')
  })

})
