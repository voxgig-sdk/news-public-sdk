# NewsPublic SDK utility registration
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
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NewsPublicUtility.registrar = ->(u) {
  u.clean = NewsPublicUtilities::Clean
  u.done = NewsPublicUtilities::Done
  u.make_error = NewsPublicUtilities::MakeError
  u.feature_add = NewsPublicUtilities::FeatureAdd
  u.feature_hook = NewsPublicUtilities::FeatureHook
  u.feature_init = NewsPublicUtilities::FeatureInit
  u.fetcher = NewsPublicUtilities::Fetcher
  u.make_fetch_def = NewsPublicUtilities::MakeFetchDef
  u.make_context = NewsPublicUtilities::MakeContext
  u.make_options = NewsPublicUtilities::MakeOptions
  u.make_request = NewsPublicUtilities::MakeRequest
  u.make_response = NewsPublicUtilities::MakeResponse
  u.make_result = NewsPublicUtilities::MakeResult
  u.make_point = NewsPublicUtilities::MakePoint
  u.make_spec = NewsPublicUtilities::MakeSpec
  u.make_url = NewsPublicUtilities::MakeUrl
  u.param = NewsPublicUtilities::Param
  u.prepare_auth = NewsPublicUtilities::PrepareAuth
  u.prepare_body = NewsPublicUtilities::PrepareBody
  u.prepare_headers = NewsPublicUtilities::PrepareHeaders
  u.prepare_method = NewsPublicUtilities::PrepareMethod
  u.prepare_params = NewsPublicUtilities::PrepareParams
  u.prepare_path = NewsPublicUtilities::PreparePath
  u.prepare_query = NewsPublicUtilities::PrepareQuery
  u.result_basic = NewsPublicUtilities::ResultBasic
  u.result_body = NewsPublicUtilities::ResultBody
  u.result_headers = NewsPublicUtilities::ResultHeaders
  u.transform_request = NewsPublicUtilities::TransformRequest
  u.transform_response = NewsPublicUtilities::TransformResponse
}
