# NewsPublic SDK exists test

require "minitest/autorun"
require_relative "../NewsPublic_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NewsPublicSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
