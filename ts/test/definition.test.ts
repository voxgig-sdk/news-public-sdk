import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "noticia",
    "accessor": "Noticia",
    "op": "list",
    "method": "GET",
    "path": "/api/noticias/",
    "args": [],
    "select": {
      "all": "v1",
      "limit": 10
    },
    "headers": [],
    "query": [
      "all",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "title": "Título de la noticia",
        "description": "Descripción de la noticia",
        "site_icon": "https://example.com/icon.png",
        "link": "https://example.com/article",
        "image": "https://example.com/image.jpg"
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
