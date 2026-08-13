# MunicipalFinance SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MunicipalFinanceUtility.registrar = ->(u) {
  u.clean = MunicipalFinanceUtilities::Clean
  u.done = MunicipalFinanceUtilities::Done
  u.make_error = MunicipalFinanceUtilities::MakeError
  u.feature_add = MunicipalFinanceUtilities::FeatureAdd
  u.feature_hook = MunicipalFinanceUtilities::FeatureHook
  u.feature_init = MunicipalFinanceUtilities::FeatureInit
  u.fetcher = MunicipalFinanceUtilities::Fetcher
  u.make_fetch_def = MunicipalFinanceUtilities::MakeFetchDef
  u.make_context = MunicipalFinanceUtilities::MakeContext
  u.make_options = MunicipalFinanceUtilities::MakeOptions
  u.make_request = MunicipalFinanceUtilities::MakeRequest
  u.make_response = MunicipalFinanceUtilities::MakeResponse
  u.make_result = MunicipalFinanceUtilities::MakeResult
  u.make_point = MunicipalFinanceUtilities::MakePoint
  u.make_spec = MunicipalFinanceUtilities::MakeSpec
  u.make_url = MunicipalFinanceUtilities::MakeUrl
  u.param = MunicipalFinanceUtilities::Param
  u.prepare_auth = MunicipalFinanceUtilities::PrepareAuth
  u.prepare_body = MunicipalFinanceUtilities::PrepareBody
  u.prepare_headers = MunicipalFinanceUtilities::PrepareHeaders
  u.prepare_method = MunicipalFinanceUtilities::PrepareMethod
  u.prepare_params = MunicipalFinanceUtilities::PrepareParams
  u.prepare_path = MunicipalFinanceUtilities::PreparePath
  u.prepare_query = MunicipalFinanceUtilities::PrepareQuery
  u.graphql_body = MunicipalFinanceUtilities::GraphqlBody
  u.graphql_errors = MunicipalFinanceUtilities::GraphqlErrors
  u.result_basic = MunicipalFinanceUtilities::ResultBasic
  u.result_body = MunicipalFinanceUtilities::ResultBody
  u.result_headers = MunicipalFinanceUtilities::ResultHeaders
  u.transform_request = MunicipalFinanceUtilities::TransformRequest
  u.transform_response = MunicipalFinanceUtilities::TransformResponse
}
