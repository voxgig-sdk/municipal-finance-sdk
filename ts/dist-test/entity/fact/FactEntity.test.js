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
(0, node_test_1.describe)('FactEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MUNICIPAL_FINANCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MUNICIPAL_FINANCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MunicipalFinanceSDK.test();
        const ent = testsdk.Fact();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('fact hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.MunicipalFinanceSDK.test(offline).Fact().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.MunicipalFinanceSDK.test(offline).Fact()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.MunicipalFinanceSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Fact().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.MunicipalFinanceSDK.test().Fact().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.MunicipalFinanceSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Fact().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Fact().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.MunicipalFinanceSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Fact().list({ "cut": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MUNICIPAL_FINANCE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'fact.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cells": { "a": true, "h": "Cells", "n": "cells", "r": false, "t": "`$ARRAY`", "key$": "cells", "index$": 0 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "t": "`$OBJECT`", "key$": "summary", "index$": 1 }, "total_cell_count": { "a": true, "h": "Total Cell Count", "n": "total_cell_count", "r": false, "sh": "Total number of cells in the result", "t": "`$INTEGER`", "key$": "total_cell_count", "index$": 2 } }, "name": "fact", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /cubes/audit_opinions/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/audit_opinions/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "audit_opinions" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /cubes/bsheet/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/bsheet/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "bsheet" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /cubes/capital/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/capital/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "capital" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /cubes/capital_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/capital_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "capital_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /cubes/cflow/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/cflow/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "cflow" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /cubes/cflow_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/cflow_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "cflow_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 5 }, { "a": true, "co": { "id": "GET /cubes/conditional_grants/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/conditional_grants/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "conditional_grants" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 6 }, { "a": true, "co": { "id": "GET /cubes/demarcation_changes/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/demarcation_changes/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "demarcation_changes" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 7 }, { "a": true, "co": { "id": "GET /cubes/financial_position_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/financial_position_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "financial_position_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 8 }, { "a": true, "co": { "id": "GET /cubes/grants_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/grants_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "grants_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 9 }, { "a": true, "co": { "id": "GET /cubes/incexp/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/incexp/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "incexp" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 10 }, { "a": true, "co": { "id": "GET /cubes/incexp_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/incexp_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "incexp_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 11 }, { "a": true, "co": { "id": "GET /cubes/municipalities/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/municipalities/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "municipalities" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 12 }, { "a": true, "co": { "id": "GET /cubes/officials/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/officials/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "officials" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 13 }, { "a": true, "co": { "id": "GET /cubes/repmaint/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/repmaint/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "repmaint" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 14 }, { "a": true, "co": { "id": "GET /cubes/repmaint_v2/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/repmaint_v2/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "repmaint_v2" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 15 }, { "a": true, "co": { "id": "GET /cubes/uifwexp/facts", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cut", "or": "cut", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "drilldown", "or": "drilldown", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/cubes/uifwexp/facts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cubes" }, { "lit": "uifwexp" }, { "lit": "facts" }], "t": { "req": "`reqdata`", "res": "`body.cells`" }, "index$": 16 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "fact", "name__orig": "fact", "Name": "Fact", "name_": "fact", "name-": "fact", "NAME": "FACT", "index$": 2 }, { "active": true, "entity": "fact", "key$": "BasicFactFlow", "kind": "basic", "name": "BasicFactFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "fact_ref01" } }], "index$": 0 }] }, 'Fact', { "GET /cubes/audit_opinions/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/bsheet/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/capital/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/capital_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/cflow/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/cflow_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/conditional_grants/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/demarcation_changes/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/financial_position_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/grants_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/incexp/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/incexp_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/municipalities/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/officials/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/repmaint/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/repmaint_v2/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /cubes/uifwexp/facts": { "protocol": "http", "parameters": [{ "name": "cut", "in": "query", "description": "Filter dimensions", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "drilldown", "in": "query", "description": "Dimensions to group by", "required": false, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let fact_ref01_data = Object.values(setup.data.existing.fact)[0];
        // LIST
        const fact_ref01_ent = client.Fact();
        const fact_ref01_match = {};
        const fact_ref01_list = (await fact_ref01_ent.list(fact_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/fact/FactTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MunicipalFinanceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['fact01', 'fact02', 'fact03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MUNICIPAL_FINANCE_TEST_FACT_ENTID': idmap,
        'MUNICIPAL_FINANCE_TEST_LIVE': 'FALSE',
        'MUNICIPAL_FINANCE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MUNICIPAL_FINANCE_TEST_FACT_ENTID'];
    const live = 'TRUE' === env.MUNICIPAL_FINANCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MUNICIPAL_FINANCE_TEST_FACT_ENTID'];
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
//# sourceMappingURL=FactEntity.test.js.map