"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('NoticiaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEWS_PUBLIC_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEWS_PUBLIC_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NewsPublicSDK.test();
        const ent = testsdk.Noticia();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEWS_PUBLIC_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'noticia.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": true, "sh": "Description or summary of the news article", "t": "`$STRING`", "key$": "description", "index$": 0 }, "image": { "a": true, "fo": "uri", "h": "Image", "n": "image", "r": true, "sh": "URL of the article image", "t": "`$STRING`", "key$": "image", "index$": 1 }, "link": { "a": true, "fo": "uri", "h": "Link", "n": "link", "r": true, "sh": "URL of the full news article", "t": "`$STRING`", "key$": "link", "index$": 2 }, "site_icon": { "a": true, "fo": "uri", "h": "Site Icon", "n": "site_icon", "r": true, "sh": "URL of the site icon", "t": "`$STRING`", "key$": "site_icon", "index$": 3 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "sh": "Title of the news article", "t": "`$STRING`", "key$": "title", "index$": 4 } }, "name": "noticia", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/noticias/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": true, "k": "query", "n": "all", "or": "all", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/noticias/", "q": { "exist": ["all", "limit"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "noticias" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "noticia", "name__orig": "noticia", "Name": "Noticia", "name_": "noticia", "name-": "noticia", "NAME": "NOTICIA", "index$": 0 }, { "active": true, "entity": "noticia", "key$": "BasicNoticiaFlow", "kind": "basic", "name": "BasicNoticiaFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "noticia_ref01" } }], "index$": 0 }] }, 'Noticia', { "GET /api/noticias/": { "protocol": "http", "operationId": "getNewsArticles", "responses": { "200": { "description": "Successful response with news articles", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "description": "A news article object containing details about a news story", "properties": { "title": { "type": "string", "description": "Title of the news article", "example": "Título de la noticia", "key$": "title" }, "description": { "type": "string", "description": "Description or summary of the news article", "example": "Descripción de la noticia", "key$": "description" }, "site_icon": { "type": "string", "format": "uri", "description": "URL of the site icon", "example": "https://example.com/icon.png", "key$": "site_icon" }, "link": { "type": "string", "format": "uri", "description": "URL of the full news article", "example": "https://example.com/article", "key$": "link" }, "image": { "type": "string", "format": "uri", "description": "URL of the article image", "example": "https://example.com/image.jpg", "key$": "image" } }, "required": ["title", "description", "site_icon", "link", "image"], "x-ref": "#/components/schemas/NewsArticle", "index$": 0 } }, "examples": { "success": { "summary": "Example response with news articles", "value": [{ "title": "Título de la noticia", "description": "Descripción de la noticia", "site_icon": "https://example.com/icon.png", "link": "https://example.com/article", "image": "https://example.com/image.jpg" }] } } } } }, "400": { "description": "Bad request - invalid parameters" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "all", "in": "query", "description": "Set to 'true' to retrieve all news articles", "required": false, "schema": { "type": "boolean", "example": true }, "index$": 0 }, { "name": "limit", "in": "query", "description": "Limit the number of news articles returned", "required": false, "schema": { "type": "integer", "minimum": 1, "example": 10 }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let noticia_ref01_data = Object.values(setup.data.existing.noticia)[0];
        // LIST
        const noticia_ref01_ent = client.Noticia();
        const noticia_ref01_match = {};
        const noticia_ref01_list = (await noticia_ref01_ent.list(noticia_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/noticia/NoticiaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NewsPublicSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['noticia01', 'noticia02', 'noticia03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEWS_PUBLIC_TEST_NOTICIA_ENTID': idmap,
        'NEWS_PUBLIC_TEST_LIVE': 'FALSE',
        'NEWS_PUBLIC_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['NEWS_PUBLIC_TEST_NOTICIA_ENTID'];
    const live = 'TRUE' === env.NEWS_PUBLIC_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEWS_PUBLIC_TEST_NOTICIA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NewsPublicSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.NEWS_PUBLIC_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=NoticiaEntity.test.js.map