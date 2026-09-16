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
(0, node_test_1.describe)('AgedDebtorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MUNICIPAL_FINANCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MUNICIPAL_FINANCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MunicipalFinanceSDK.test();
        const ent = testsdk.AgedDebtor();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MUNICIPAL_FINANCE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'aged_debtor.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "amount_sum", "req": false, "short": "Sum of the amount", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "amount_type_code", "req": false, "short": "Amount type code", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "amount_type_label", "req": false, "short": "Amount type label", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "customer_group_code", "req": false, "short": "Customer group code", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "demarcation_code", "req": false, "short": "Municipality demarcation code", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "demarcation_label", "req": false, "short": "Municipality name", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "financial_period_period", "req": false, "short": "Financial period number", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "financial_year_end_year", "req": false, "short": "Financial year end", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "item_code", "req": false, "short": "Item code", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "item_composition", "req": false, "short": "Item composition formula", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "item_label", "req": false, "short": "Item label", "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "item_position_in_return_form", "req": false, "short": "Position in return form", "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "item_return_form_structure", "req": false, "short": "Return form structure", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "period_length_length", "req": false, "short": "Period length", "type": "`$STRING`", "index$": 13 }], "name": "aged_debtor", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "aggregate", "orig": "aggregate", "reqd": false, "type": "`$STRING`" }, { "active": true, "example": "financial_year_end.year:2020|customer_group.code:households", "kind": "query", "name": "cut", "orig": "cut", "reqd": false, "type": "`$STRING`" }, { "active": true, "example": "item.code|customer_group.code", "kind": "query", "name": "drilldown", "orig": "drilldown", "reqd": false, "type": "`$STRING`" }, { "active": true, "kind": "query", "name": "order", "orig": "order", "reqd": false, "type": "`$STRING`" }, { "active": true, "example": 0, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`" }, { "active": true, "example": 10000, "kind": "query", "name": "pagesize", "orig": "pagesize", "reqd": false, "type": "`$INTEGER`" }] }, "contract": { "id": "GET /cubes/aged_debtor/facts", "json": "{\"operationId\":\"getAgedDebtorAnalysis\",\"parameters\":[{\"description\":\"Filter dimensions using pipe-separated dimension:value pairs\",\"example\":\"financial_year_end.year:2020|customer_group.code:households\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by (pipe-separated)\",\"example\":\"item.code|customer_group.code\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Aggregation measures to return\",\"in\":\"query\",\"name\":\"aggregates\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Order results by specified field\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"pagesize\",\"required\":false,\"schema\":{\"default\":10000,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"properties\":{\"amount.sum\":{\"description\":\"Sum of the amount\",\"type\":\"number\"},\"amount_type.code\":{\"description\":\"Amount type code\",\"type\":\"string\"},\"amount_type.label\":{\"description\":\"Amount type label\",\"type\":\"string\"},\"customer_group.code\":{\"description\":\"Customer group code\",\"type\":\"string\"},\"demarcation.code\":{\"description\":\"Municipality demarcation code\",\"type\":\"string\"},\"demarcation.label\":{\"description\":\"Municipality name\",\"type\":\"string\"},\"financial_period.period\":{\"description\":\"Financial period number\",\"type\":\"integer\"},\"financial_year_end.year\":{\"description\":\"Financial year end\",\"type\":\"integer\"},\"item.code\":{\"description\":\"Item code\",\"type\":\"string\"},\"item.composition\":{\"description\":\"Item composition formula\",\"type\":\"string\"},\"item.label\":{\"description\":\"Item label\",\"type\":\"string\"},\"item.position_in_return_form\":{\"description\":\"Position in return form\",\"type\":\"integer\"},\"item.return_form_structure\":{\"description\":\"Return form structure\",\"type\":\"string\"},\"period_length.length\":{\"description\":\"Period length\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with aged debtor data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status code\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status code\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cubes/aged_debtor/facts", "segments": [{ "lit": "cubes" }, { "lit": "aged_debtor" }, { "lit": "facts" }], "select": { "$action": "fact", "exist": ["aggregate", "cut", "drilldown", "order", "page", "pagesize"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "aggregate", "orig": "aggregate", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "cut", "orig": "cut", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "drilldown", "orig": "drilldown", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "order", "orig": "order", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 0, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "example": 10000, "kind": "query", "name": "pagesize", "orig": "pagesize", "reqd": false, "type": "`$INTEGER`", "index$": 5 }] }, "contract": { "id": "GET /cubes/aged_debtor_v2/facts", "json": "{\"operationId\":\"getAgedDebtorAnalysisV2\",\"parameters\":[{\"description\":\"Filter dimensions using pipe-separated dimension:value pairs\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by (pipe-separated)\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Aggregation measures to return\",\"in\":\"query\",\"name\":\"aggregates\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Order results by specified field\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"pagesize\",\"required\":false,\"schema\":{\"default\":10000,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"properties\":{\"amount.sum\":{\"description\":\"Sum of the amount\",\"type\":\"number\"},\"amount_type.code\":{\"description\":\"Amount type code\",\"type\":\"string\"},\"amount_type.label\":{\"description\":\"Amount type label\",\"type\":\"string\"},\"customer_group.code\":{\"description\":\"Customer group code\",\"type\":\"string\"},\"demarcation.code\":{\"description\":\"Municipality demarcation code\",\"type\":\"string\"},\"demarcation.label\":{\"description\":\"Municipality name\",\"type\":\"string\"},\"financial_period.period\":{\"description\":\"Financial period number\",\"type\":\"integer\"},\"financial_year_end.year\":{\"description\":\"Financial year end\",\"type\":\"integer\"},\"item.code\":{\"description\":\"Item code\",\"type\":\"string\"},\"item.composition\":{\"description\":\"Item composition formula\",\"type\":\"string\"},\"item.label\":{\"description\":\"Item label\",\"type\":\"string\"},\"item.position_in_return_form\":{\"description\":\"Position in return form\",\"type\":\"integer\"},\"item.return_form_structure\":{\"description\":\"Return form structure\",\"type\":\"string\"},\"period_length.length\":{\"description\":\"Period length\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with aged debtor data (v2)\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status code\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status code\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cubes/aged_debtor_v2/facts", "segments": [{ "lit": "cubes" }, { "lit": "aged_debtor_v2" }, { "lit": "facts" }], "select": { "exist": ["aggregate", "cut", "drilldown", "order", "page", "pagesize"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "aged_debtor", "name__orig": "aged_debtor", "Name": "AgedDebtor", "name_": "aged_debtor", "name-": "aged-debtor", "NAME": "AGED_DEBTOR", "index$": 1 }, { "active": true, "entity": "aged_debtor", "key$": "BasicAgedDebtorFlow", "kind": "basic", "name": "BasicAgedDebtorFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "aged_debtor_ref01" } }], "index$": 0 }] }, 'AgedDebtor');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let aged_debtor_ref01_data = Object.values(setup.data.existing.aged_debtor)[0];
        // LIST
        const aged_debtor_ref01_ent = client.AgedDebtor();
        const aged_debtor_ref01_match = {};
        const aged_debtor_ref01_list = (await aged_debtor_ref01_ent.list(aged_debtor_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/aged_debtor/AgedDebtorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MunicipalFinanceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['aged_debtor01', 'aged_debtor02', 'aged_debtor03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MUNICIPAL_FINANCE_TEST_AGED_DEBTOR_ENTID': idmap,
        'MUNICIPAL_FINANCE_TEST_LIVE': 'FALSE',
        'MUNICIPAL_FINANCE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MUNICIPAL_FINANCE_TEST_AGED_DEBTOR_ENTID'];
    const live = 'TRUE' === env.MUNICIPAL_FINANCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MUNICIPAL_FINANCE_TEST_AGED_DEBTOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MunicipalFinanceSDK(merge([
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
        explain: 'TRUE' === env.MUNICIPAL_FINANCE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AgedDebtorEntity.test.js.map