# NewsPublic SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NewsPublicFeatures
  def self.make_feature(name)
    case name
    when "base"
      NewsPublicBaseFeature.new
    when "test"
      NewsPublicTestFeature.new
    else
      NewsPublicBaseFeature.new
    end
  end
end
