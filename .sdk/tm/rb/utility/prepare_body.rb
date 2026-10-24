# NewsPublic SDK utility: prepare_body
require_relative 'media'
module NewsPublicUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NewsPublicUtilities.raw_body(ctx.reqdata) if NewsPublicUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
