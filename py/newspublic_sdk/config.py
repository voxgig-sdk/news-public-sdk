# NewsPublic SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NewsPublic",
            "slug": "news-public",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://news-public-api.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "noticia": {},
            },
        },
        "entity": {
      "noticia": {
        "fields": [
          {
            "name": "description",
            "req": True,
            "short": "Description or summary of the news article",
            "type": "`$STRING`",
          },
          {
            "name": "image",
            "req": True,
            "short": "URL of the article image",
            "type": "`$STRING`",
          },
          {
            "name": "link",
            "req": True,
            "short": "URL of the full news article",
            "type": "`$STRING`",
          },
          {
            "name": "site_icon",
            "req": True,
            "short": "URL of the site icon",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "req": True,
            "short": "Title of the news article",
            "type": "`$STRING`",
          },
        ],
        "name": "noticia",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": True,
                      "kind": "query",
                      "name": "all",
                      "orig": "all",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/noticias/",
                "parts": [
                  "api",
                  "noticias",
                ],
                "select": {
                  "exist": [
                    "all",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
