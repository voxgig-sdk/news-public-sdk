package = "voxgig-sdk-news-public"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/news-public-sdk.git"
}
description = {
  summary = "NewsPublic SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["news-public_sdk"] = "news-public_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
