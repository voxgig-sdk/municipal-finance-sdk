# MunicipalFinance SDK utility: feature_add
module MunicipalFinanceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
