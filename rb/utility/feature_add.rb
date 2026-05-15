# NewsPublic SDK utility: feature_add
module NewsPublicUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
