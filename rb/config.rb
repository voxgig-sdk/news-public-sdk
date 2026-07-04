# NewsPublic SDK configuration

module NewsPublicConfig
  def self.make_config
    {
      "main" => {
        "name" => "NewsPublic",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://news-public-api.onrender.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "noticia" => {},
        },
      },
      "entity" => {
        "noticia" => {
          "fields" => [
            {
              "active" => true,
              "name" => "description",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "image",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "link",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "site_icon",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
          ],
          "name" => "noticia",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => true,
                        "kind" => "query",
                        "name" => "all",
                        "orig" => "all",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/api/noticias/",
                  "parts" => [
                    "api",
                    "noticias",
                  ],
                  "select" => {
                    "exist" => [
                      "all",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    NewsPublicFeatures.make_feature(name)
  end
end
