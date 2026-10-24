# MunicipalFinance SDK utility: prepare_body
require_relative 'media'
module MunicipalFinanceUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return MunicipalFinanceUtilities.raw_body(ctx.reqdata) if MunicipalFinanceUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
