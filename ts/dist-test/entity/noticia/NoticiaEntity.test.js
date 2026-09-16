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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "description", "req": true, "short": "Description or summary of the news article", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "uri", "name": "image", "req": true, "short": "URL of the article image", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "uri", "name": "link", "req": true, "short": "URL of the full news article", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "uri", "name": "site_icon", "req": true, "short": "URL of the site icon", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "title", "req": true, "short": "Title of the news article", "type": "`$STRING`", "index$": 4 }], "name": "noticia", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": true, "kind": "query", "name": "all", "orig": "all", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /api/noticias/", "json": "{\"operationId\":\"getNewsArticles\",\"parameters\":[{\"description\":\"Set to 'true' to retrieve all news articles\",\"in\":\"query\",\"name\":\"all\",\"required\":false,\"schema\":{\"example\":true,\"type\":\"boolean\"}},{\"description\":\"Limit the number of news articles returned\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"example\":10,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Example response with news articles\",\"value\":[{\"description\":\"Descripción de la noticia\",\"image\":\"https://example.com/image.jpg\",\"link\":\"https://example.com/article\",\"site_icon\":\"https://example.com/icon.png\",\"title\":\"Título de la noticia\"}]}},\"schema\":{\"items\":{\"description\":\"A news article object containing details about a news story\",\"properties\":{\"description\":{\"description\":\"Description or summary of the news article\",\"example\":\"Descripción de la noticia\",\"type\":\"string\"},\"image\":{\"description\":\"URL of the article image\",\"example\":\"https://example.com/image.jpg\",\"format\":\"uri\",\"type\":\"string\"},\"link\":{\"description\":\"URL of the full news article\",\"example\":\"https://example.com/article\",\"format\":\"uri\",\"type\":\"string\"},\"site_icon\":{\"description\":\"URL of the site icon\",\"example\":\"https://example.com/icon.png\",\"format\":\"uri\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the news article\",\"example\":\"Título de la noticia\",\"type\":\"string\"}},\"required\":[\"title\",\"description\",\"site_icon\",\"link\",\"image\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with news articles\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/noticias/", "segments": [{ "lit": "api" }, { "lit": "noticias" }], "select": { "exist": ["all", "limit"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "noticia", "name__orig": "noticia", "Name": "Noticia", "name_": "noticia", "name-": "noticia", "NAME": "NOTICIA", "index$": 0 }, { "active": true, "entity": "noticia", "key$": "BasicNoticiaFlow", "kind": "basic", "name": "BasicNoticiaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "noticia_ref01" } }], "index$": 0 }] }, 'Noticia');
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