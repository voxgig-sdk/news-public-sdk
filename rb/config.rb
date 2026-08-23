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
              "name" => "description",
              "req" => true,
              "short" => "Description or summary of the news article",
              "type" => "`$STRING`",
            },
            {
              "name" => "image",
              "req" => true,
              "short" => "URL of the article image",
              "type" => "`$STRING`",
            },
            {
              "name" => "link",
              "req" => true,
              "short" => "URL of the full news article",
              "type" => "`$STRING`",
            },
            {
              "name" => "site_icon",
              "req" => true,
              "short" => "URL of the site icon",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "short" => "Title of the news article",
              "type" => "`$STRING`",
            },
          ],
          "name" => "noticia",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => true,
                        "kind" => "query",
                        "name" => "all",
                        "orig" => "all",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
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
