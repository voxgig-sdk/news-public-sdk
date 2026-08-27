-- NewsPublic SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NewsPublic",
      slug = "news-public",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://news-public-api.onrender.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["noticia"] = {},
      },
    },
    entity = {
      ["noticia"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["req"] = true,
            ["short"] = "Description or summary of the news article",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "image",
            ["req"] = true,
            ["short"] = "URL of the article image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "link",
            ["req"] = true,
            ["short"] = "URL of the full news article",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "site_icon",
            ["req"] = true,
            ["short"] = "URL of the site icon",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["short"] = "Title of the news article",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "noticia",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = true,
                      ["kind"] = "query",
                      ["name"] = "all",
                      ["orig"] = "all",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/noticias/",
                ["parts"] = {
                  "api",
                  "noticias",
                },
                ["select"] = {
                  ["exist"] = {
                    "all",
                    "limit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
