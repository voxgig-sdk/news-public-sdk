
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NewsPublic',
        slug: "news-public",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://news-public-api.onrender.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      noticia: {
      },

    }
  }


  entity = {
    "noticia": {
      "fields": [
        {
          "name": "description",
          "req": true,
          "short": "Description or summary of the news article",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "image",
          "req": true,
          "short": "URL of the article image",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "link",
          "req": true,
          "short": "URL of the full news article",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "site_icon",
          "req": true,
          "short": "URL of the site icon",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "short": "Title of the news article",
          "type": "`$STRING`"
        }
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
                    "example": true,
                    "kind": "query",
                    "name": "all",
                    "orig": "all",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/noticias/",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "noticias"
                }
              ],
              "select": {
                "exist": [
                  "all",
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "noticias"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

