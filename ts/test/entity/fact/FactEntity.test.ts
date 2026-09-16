

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MunicipalFinanceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('FactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MUNICIPAL_FINANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('MUNICIPAL_FINANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MunicipalFinanceSDK.test()
    const ent = testsdk.Fact()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MUNICIPAL_FINANCE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cells","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"summary","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"total_cell_count","req":false,"short":"Total number of cells in the result","type":"`$INTEGER`","index$":2}],"name":"fact","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/audit_opinions/facts","json":"{\"operationId\":\"getAuditOpinions\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/audit_opinions/facts","segments":[{"lit":"cubes"},{"lit":"audit_opinions"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/bsheet/facts","json":"{\"operationId\":\"getBalanceSheet\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/bsheet/facts","segments":[{"lit":"cubes"},{"lit":"bsheet"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/capital/facts","json":"{\"operationId\":\"getCapitalAcquisition\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/capital/facts","segments":[{"lit":"cubes"},{"lit":"capital"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/capital_v2/facts","json":"{\"operationId\":\"getCapitalAcquisitionV2\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/capital_v2/facts","segments":[{"lit":"cubes"},{"lit":"capital_v2"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/cflow/facts","json":"{\"operationId\":\"getCashFlow\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/cflow/facts","segments":[{"lit":"cubes"},{"lit":"cflow"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/cflow_v2/facts","json":"{\"operationId\":\"getCashFlowV2\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/cflow_v2/facts","segments":[{"lit":"cubes"},{"lit":"cflow_v2"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":5},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/conditional_grants/facts","json":"{\"operationId\":\"getConditionalGrants\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/conditional_grants/facts","segments":[{"lit":"cubes"},{"lit":"conditional_grants"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":6},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/demarcation_changes/facts","json":"{\"operationId\":\"getDemarcationChanges\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/demarcation_changes/facts","segments":[{"lit":"cubes"},{"lit":"demarcation_changes"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":7},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/financial_position_v2/facts","json":"{\"operationId\":\"getFinancialPositionV2\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/financial_position_v2/facts","segments":[{"lit":"cubes"},{"lit":"financial_position_v2"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":8},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/grants_v2/facts","json":"{\"operationId\":\"getGrantsV2\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/grants_v2/facts","segments":[{"lit":"cubes"},{"lit":"grants_v2"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":9},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/incexp/facts","json":"{\"operationId\":\"getIncomeExpenditure\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/incexp/facts","segments":[{"lit":"cubes"},{"lit":"incexp"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":10},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/incexp_v2/facts","json":"{\"operationId\":\"getIncomeExpenditureV2\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/incexp_v2/facts","segments":[{"lit":"cubes"},{"lit":"incexp_v2"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":11},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/municipalities/facts","json":"{\"operationId\":\"getMunicipalities\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/municipalities/facts","segments":[{"lit":"cubes"},{"lit":"municipalities"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":12},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/officials/facts","json":"{\"operationId\":\"getMunicipalOfficials\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/officials/facts","segments":[{"lit":"cubes"},{"lit":"officials"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":13},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/repmaint/facts","json":"{\"operationId\":\"getRepairsMaintenance\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/repmaint/facts","segments":[{"lit":"cubes"},{"lit":"repmaint"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":14},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/repmaint_v2/facts","json":"{\"operationId\":\"getRepairsMaintenanceV2\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/repmaint_v2/facts","segments":[{"lit":"cubes"},{"lit":"repmaint_v2"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":15},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cut","orig":"cut","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"drilldown","orig":"drilldown","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /cubes/uifwexp/facts","json":"{\"operationId\":\"getUIFWExpenditure\",\"parameters\":[{\"description\":\"Filter dimensions\",\"in\":\"query\",\"name\":\"cut\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Dimensions to group by\",\"in\":\"query\",\"name\":\"drilldown\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cells\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"summary\":{\"additionalProperties\":true,\"type\":\"object\"},\"total_cell_count\":{\"description\":\"Total number of cells in the result\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cubes/uifwexp/facts","segments":[{"lit":"cubes"},{"lit":"uifwexp"},{"lit":"facts"}],"select":{"exist":["cut","drilldown"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":16}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"fact","name__orig":"fact","Name":"Fact","name_":"fact","name-":"fact","NAME":"FACT","index$":2}, {"active":true,"entity":"fact","key$":"BasicFactFlow","kind":"basic","name":"BasicFactFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"fact_ref01"}}],"index$":0}]}, 'Fact')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let fact_ref01_data = Object.values(setup.data.existing.fact)[0] as any

    // LIST
    const fact_ref01_ent = client.Fact()
    const fact_ref01_match: any = {}

    const fact_ref01_list = (await fact_ref01_ent.list(fact_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fact/FactTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MunicipalFinanceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['fact01','fact02','fact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MUNICIPAL_FINANCE_TEST_FACT_ENTID': idmap,
    'MUNICIPAL_FINANCE_TEST_LIVE': 'FALSE',
    'MUNICIPAL_FINANCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MUNICIPAL_FINANCE_TEST_FACT_ENTID']

  const live = 'TRUE' === env.MUNICIPAL_FINANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MUNICIPAL_FINANCE_TEST_FACT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MunicipalFinanceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
