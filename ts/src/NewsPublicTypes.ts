// Typed models for the NewsPublic SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Noticia {
  description: string
  image: string
  link: string
  site_icon: string
  title: string
}

export interface NoticiaListMatch {
  description?: string
  image?: string
  link?: string
  site_icon?: string
  title?: string
}

