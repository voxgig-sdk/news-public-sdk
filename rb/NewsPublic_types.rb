# frozen_string_literal: true

# Typed models for the NewsPublic SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Noticia entity data model.
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] image
#   @return [String]
#
# @!attribute [rw] link
#   @return [String]
#
# @!attribute [rw] site_icon
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
Noticia = Struct.new(
  :description,
  :image,
  :link,
  :site_icon,
  :title,
  keyword_init: true
)

# Request payload for Noticia#list.
#
# @!attribute [rw] all
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
NoticiaListMatch = Struct.new(
  :all,
  :limit,
  keyword_init: true
)

