# Coworkingview SDK utility registration
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

CoworkingviewUtility.registrar = ->(u) {
  u.clean = CoworkingviewUtilities::Clean
  u.clean_add = CoworkingviewUtilities::CleanAdd
  u.clean_explain = CoworkingviewUtilities::CleanExplain
  u.done = CoworkingviewUtilities::Done
  u.make_error = CoworkingviewUtilities::MakeError
  u.feature_add = CoworkingviewUtilities::FeatureAdd
  u.feature_hook = CoworkingviewUtilities::FeatureHook
  u.feature_init = CoworkingviewUtilities::FeatureInit
  u.fetcher = CoworkingviewUtilities::Fetcher
  u.make_fetch_def = CoworkingviewUtilities::MakeFetchDef
  u.make_context = CoworkingviewUtilities::MakeContext
  u.make_options = CoworkingviewUtilities::MakeOptions
  u.make_request = CoworkingviewUtilities::MakeRequest
  u.make_response = CoworkingviewUtilities::MakeResponse
  u.make_result = CoworkingviewUtilities::MakeResult
  u.make_point = CoworkingviewUtilities::MakePoint
  u.make_spec = CoworkingviewUtilities::MakeSpec
  u.make_url = CoworkingviewUtilities::MakeUrl
  u.param = CoworkingviewUtilities::Param
  u.prepare_auth = CoworkingviewUtilities::PrepareAuth
  u.prepare_body = CoworkingviewUtilities::PrepareBody
  u.prepare_headers = CoworkingviewUtilities::PrepareHeaders
  u.prepare_method = CoworkingviewUtilities::PrepareMethod
  u.prepare_params = CoworkingviewUtilities::PrepareParams
  u.prepare_path = CoworkingviewUtilities::PreparePath
  u.prepare_query = CoworkingviewUtilities::PrepareQuery
  u.graphql_body = CoworkingviewUtilities::GraphqlBody
  u.graphql_errors = CoworkingviewUtilities::GraphqlErrors
  u.result_basic = CoworkingviewUtilities::ResultBasic
  u.result_body = CoworkingviewUtilities::ResultBody
  u.result_headers = CoworkingviewUtilities::ResultHeaders
  u.transform_request = CoworkingviewUtilities::TransformRequest
  u.transform_response = CoworkingviewUtilities::TransformResponse
}
