# Coworkingview SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CoworkingviewFeatures
  def self.make_feature(name)
    case name
    when "base"
      CoworkingviewBaseFeature.new
    when "ratelimit"
      CoworkingviewRatelimitFeature.new
    when "retry"
      CoworkingviewRetryFeature.new
    when "test"
      CoworkingviewTestFeature.new
    when "timeout"
      CoworkingviewTimeoutFeature.new
    else
      CoworkingviewBaseFeature.new
    end
  end
end
