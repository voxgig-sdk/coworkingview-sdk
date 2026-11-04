# Coworkingview SDK utility: make_context
require_relative '../core/context'
module CoworkingviewUtilities
  MakeContext = ->(ctxmap, basectx) {
    CoworkingviewContext.new(ctxmap, basectx)
  }
end
