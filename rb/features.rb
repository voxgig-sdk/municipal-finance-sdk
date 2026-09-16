# MunicipalFinance SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MunicipalFinanceFeatures
  def self.make_feature(name)
    case name
    when "base"
      MunicipalFinanceBaseFeature.new
    when "ratelimit"
      MunicipalFinanceRatelimitFeature.new
    when "retry"
      MunicipalFinanceRetryFeature.new
    when "test"
      MunicipalFinanceTestFeature.new
    when "timeout"
      MunicipalFinanceTimeoutFeature.new
    else
      MunicipalFinanceBaseFeature.new
    end
  end
end
