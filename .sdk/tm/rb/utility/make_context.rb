# MunicipalFinance SDK utility: make_context
require_relative '../core/context'
module MunicipalFinanceUtilities
  MakeContext = ->(ctxmap, basectx) {
    MunicipalFinanceContext.new(ctxmap, basectx)
  }
end
