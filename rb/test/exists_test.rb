# MunicipalFinance SDK exists test

require "minitest/autorun"
require_relative "../MunicipalFinance_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MunicipalFinanceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
