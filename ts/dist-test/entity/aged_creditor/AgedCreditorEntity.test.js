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
(0, node_test_1.describe)('AgedCreditorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MUNICIPAL_FINANCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MUNICIPAL_FINANCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MunicipalFinanceSDK.test();
        const ent = testsdk.AgedCreditor();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('aged_creditor hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.MunicipalFinanceSDK.test(offline).AgedCreditor().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.MunicipalFinanceSDK.test(offline).AgedCreditor()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.MunicipalFinanceSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.AgedCreditor().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.MunicipalFinanceSDK.test().AgedCreditor().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.MunicipalFinanceSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.AgedCreditor().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.AgedCreditor().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.MunicipalFinanceSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgedCreditor().list({ "aggregate": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MUNICIPAL_FINANCE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'aged_creditor.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount_sum": { "a": true, "h": "Amount Sum", "n": "amount_sum", "r": false, "sh": "Sum of the amount", "t": "`$NUMBER`", "key$": "amount_sum", "index$": 0 }, "amount_type_code": { "a": true, "h": "Amount Type Code", "n": "amount_type_code", "r": false, "sh": "Amount type code", "t": "`$STRING`", "key$": "amount_type_code", "index$": 1 }, "amount_type_label": { "a": true, "h": "Amount Type Label", "n": "amount_type_label", "r": false, "sh": "Amount type label", "t": "`$STRING`", "key$": "amount_type_label", "index$": 2 }, "demarcation_code": { "a": true, "h": "Demarcation Code", "n": "demarcation_code", "r": false, "sh": "Municipality demarcation code", "t": "`$STRING`", "key$": "demarcation_code", "index$": 3 }, "demarcation_label": { "a": true, "h": "Demarcation Label", "n": "demarcation_label", "r": false, "sh": "Municipality name", "t": "`$STRING`", "key$": "demarcation_label", "index$": 4 }, "financial_period_period": { "a": true, "h": "Financial Period Period", "n": "financial_period_period", "r": false, "sh": "Financial period number", "t": "`$INTEGER`", "key$": "financial_period_period", "index$": 5 }, "financial_year_end_year": { "a": true, "h": "Financial Year End Year", "n": "financial_year_end_year", "r": false, "sh": "Financial year end", "t": "`$INTEGER`", "key$": "financial_year_end_year", "index$": 6 }, "item_code": { "a": true, "h": "Item Code", "n": "item_code", "r": false, "sh": "Item code", "t": "`$STRING`", "key$": "item_code", "index$": 7 }, "item_composition": { "a": true, "h": "Item Composition", "n": "item_composition", "r": false, "sh": "Item composition formula", "t": "`$STRING`", "key$": "item_composition", "index$": 8 }, "item_label": { "a": true, "h": "Item Label", "n": "item_label", "r": false, "sh": "Item label", "t": "`$STRING`", "key$": "item_label", "index$": 9 }, "item_position_in_return_form": { "a": true, "h": "Item Position In Return Form", "n": "item_position_in_return_form", "r": false, "sh": "Position in return form", "t": "`$INTEGER`", "key$": "item_position_in_return_form", "index$": 10 }, "item_return_form_structure": { "a": true, "h": "Item Return Form Structure", "n": "item_return_form_structure", "r": false, "sh": "Return form structure", "t": "`$STRING`", "key$": "item_return_form_structure", "index$": 11 }, "period_length_length": { "a": true, "h": "Period Length Length", "n": "period_length_length", "r": false, "sh": "Period length", "t": "`$STRING`", "key$": "period_length_length", "index$": 12 } }, "name": "aged_creditor", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /cubes/aged_creditor/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "amount.sum", "k": "query", "n": "aggregate", "or": "aggregates", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "financial_year_end.year:2020|demarcation.code:CPT", "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "item.code|financial_period.period", "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "financial_period.period:asc", "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 0, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": 10000, "k": "query", "n": "pagesize", "or": "pagesize", "r": false, "t": "`$INTEGER`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/cubes/aged_creditor/facts", "q": { "$action": "fact" }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "aged_creditor" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /cubes/aged_creditor_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "aggregate", "or": "aggregates", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "order", "or": "order", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 0, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": 10000, "k": "query", "n": "pagesize", "or": "pagesize", "r": false, "t": "`$INTEGER`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/cubes/aged_creditor_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "aged_creditor_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "aged_creditor", "name__orig": "aged_creditor", "Name": "AgedCreditor", "name_": "aged_creditor", "name-": "aged-creditor", "NAME": "AGED_CREDITOR", "index$": 0 }, { "active": true, "entity": "aged_creditor", "key$": "BasicAgedCreditorFlow", "kind": "basic", "name": "BasicAgedCreditorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "aged_creditor_ref01" } }], "index$": 0 }] }, 'AgedCreditor', { "GET /cubes/aged_creditor/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions using pipe-separated dimension:value pairs", "required": false, "schema": { "type": "string" }, "example": "financial_year_end.year:2020|demarcation.code:CPT", "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by (pipe-separated)", "required": false, "schema": { "type": "string" }, "example": "item.code|financial_period.period", "index$": 1 }, { "name": "aggregates", "in": "query", "description": "Aggregation measures to return", "required": false, "schema": { "type": "string" }, "example": "amount.sum", "index$": 2 }, { "name": "order", "in": "query", "description": "Order results by specified field", "required": false, "schema": { "type": "string" }, "example": "financial_period.period:asc", "index$": 3 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 0 }, "index$": 4 }, { "name": "pagesize", "in": "query", "description": "Number of results per page", "required": false, "schema": { "type": "integer", "default": 10000 }, "index$": 5 }] }, "GET /cubes/aged_creditor_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions using pipe-separated dimension:value pairs", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by (pipe-separated)", "required": false, "schema": { "type": "string" }, "index$": 1 }, { "name": "aggregates", "in": "query", "description": "Aggregation measures to return", "required": false, "schema": { "type": "string" }, "index$": 2 }, { "name": "order", "in": "query", "description": "Order results by specified field", "required": false, "schema": { "type": "string" }, "index$": 3 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 0 }, "index$": 4 }, { "name": "pagesize", "in": "query", "description": "Number of results per page", "required": false, "schema": { "type": "integer", "default": 10000 }, "index$": 5 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let aged_creditor_ref01_data = Object.values(setup.data.existing.aged_creditor)[0];
        // LIST
        const aged_creditor_ref01_ent = client.AgedCreditor();
        const aged_creditor_ref01_match = {};
        const aged_creditor_ref01_list = (await aged_creditor_ref01_ent.list(aged_creditor_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/aged_creditor/AgedCreditorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MunicipalFinanceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['aged_creditor01', 'aged_creditor02', 'aged_creditor03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MUNICIPAL_FINANCE_TEST_AGED_CREDITOR_ENTID': idmap,
        'MUNICIPAL_FINANCE_TEST_LIVE': 'FALSE',
        'MUNICIPAL_FINANCE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MUNICIPAL_FINANCE_TEST_AGED_CREDITOR_ENTID'];
    const live = 'TRUE' === env.MUNICIPAL_FINANCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MUNICIPAL_FINANCE_TEST_AGED_CREDITOR_ENTID'];
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
//# sourceMappingURL=AgedCreditorEntity.test.js.map