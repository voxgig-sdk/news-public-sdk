
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'NewsPublic',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "image",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "link",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "site_icon",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
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
              "parts": [
                "api",
                "noticias"
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
              }
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
  config
}

