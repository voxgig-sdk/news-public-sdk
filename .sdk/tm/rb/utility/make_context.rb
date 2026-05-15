# NewsPublic SDK utility: make_context
require_relative '../core/context'
module NewsPublicUtilities
  MakeContext = ->(ctxmap, basectx) {
    NewsPublicContext.new(ctxmap, basectx)
  }
end
