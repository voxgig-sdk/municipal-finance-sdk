-- MunicipalFinance SDK exists test

local sdk = require("municipal-finance_sdk")

describe("MunicipalFinanceSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
