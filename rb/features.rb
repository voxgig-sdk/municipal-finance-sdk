# MunicipalFinance SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MunicipalFinanceFeatures
  def self.make_feature(name)
    case name
    when "base"
      MunicipalFinanceBaseFeature.new
    when "test"
      MunicipalFinanceTestFeature.new
    else
      MunicipalFinanceBaseFeature.new
    end
  end
end
