-- Coworkingview SDK exists test

local sdk = require("coworkingview_sdk")

describe("CoworkingviewSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
