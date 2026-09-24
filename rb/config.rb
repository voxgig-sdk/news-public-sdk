# NewsPublic SDK configuration

module NewsPublicConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "NewsPublic",
        "slug" => "news-public",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
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
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Description or summary of the news article",
            },
            {
              "name" => "image",
              "title" => "Image",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "URL of the article image",
              "format" => "uri",
            },
            {
              "name" => "link",
              "title" => "Link",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "URL of the full news article",
              "format" => "uri",
            },
            {
              "name" => "site_icon",
              "title" => "Site Icon",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "URL of the site icon",
              "format" => "uri",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Title of the news article",
            },
          ],
          "name" => "noticia",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/noticias/",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "noticias",
                    },
                  ],
                  "parts" => [
                    "api",
                    "noticias",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "all",
                        "orig" => "all",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "all",
                      "limit",
                    ],
                  },
                },
              ],
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
