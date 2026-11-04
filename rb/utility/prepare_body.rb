# Coworkingview SDK utility: prepare_body
require_relative 'media'
module CoworkingviewUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return CoworkingviewUtilities.raw_body(ctx.reqdata) if CoworkingviewUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
