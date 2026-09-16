# NewsPublic SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NewsPublicFeatures
  def self.make_feature(name)
    case name
    when "base"
      NewsPublicBaseFeature.new
    when "ratelimit"
      NewsPublicRatelimitFeature.new
    when "retry"
      NewsPublicRetryFeature.new
    when "test"
      NewsPublicTestFeature.new
    when "timeout"
      NewsPublicTimeoutFeature.new
    else
      NewsPublicBaseFeature.new
    end
  end
end
