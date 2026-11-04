# Coworkingview SDK exists test

require "minitest/autorun"
require_relative "../Coworkingview_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CoworkingviewSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
