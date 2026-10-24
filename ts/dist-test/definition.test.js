"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "all",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "all",
                "wire": "all"
            },
            {
                "name": "limit",
                "wire": "limit"
            }
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map