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
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
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
            ["format"] = "uri",
            ["name"] = "image",
            ["req"] = true,
            ["short"] = "URL of the article image",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "link",
            ["req"] = true,
            ["short"] = "URL of the full news article",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
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
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "noticias",
                  },
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
                ["parts"] = {
                  "api",
                  "noticias",
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
