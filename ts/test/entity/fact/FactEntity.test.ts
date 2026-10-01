

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cells":{"a":true,"h":"Cells","n":"cells","r":false,"t":"`$ARRAY`","key$":"cells","index$":0},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"t":"`$OBJECT`","key$":"summary","index$":1},"total_cell_count":{"a":true,"h":"Total Cell Count","n":"total_cell_count","r":false,"sh":"Total number of cells in the result","t":"`$INTEGER`","key$":"total_cell_count","index$":2}},"name":"fact","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /cubes/audit_opinions/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/audit_opinions/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"audit_opinions"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":0},{"a":true,"co":{"id":"GET /cubes/bsheet/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/bsheet/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"bsheet"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":1},{"a":true,"co":{"id":"GET /cubes/capital/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/capital/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"capital"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":2},{"a":true,"co":{"id":"GET /cubes/capital_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/capital_v2/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"capital_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":3},{"a":true,"co":{"id":"GET /cubes/cflow/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/cflow/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"cflow"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":4},{"a":true,"co":{"id":"GET /cubes/cflow_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/cflow_v2/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"cflow_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":5},{"a":true,"co":{"id":"GET /cubes/conditional_grants/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/conditional_grants/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"conditional_grants"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":6},{"a":true,"co":{"id":"GET /cubes/demarcation_changes/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/demarcation_changes/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"demarcation_changes"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":7},{"a":true,"co":{"id":"GET /cubes/financial_position_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/financial_position_v2/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"financial_position_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":8},{"a":true,"co":{"id":"GET /cubes/grants_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/grants_v2/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"grants_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":9},{"a":true,"co":{"id":"GET /cubes/incexp/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/incexp/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"incexp"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":10},{"a":true,"co":{"id":"GET /cubes/incexp_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/incexp_v2/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"incexp_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":11},{"a":true,"co":{"id":"GET /cubes/municipalities/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/municipalities/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"municipalities"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":12},{"a":true,"co":{"id":"GET /cubes/officials/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/officials/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"officials"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":13},{"a":true,"co":{"id":"GET /cubes/repmaint/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/repmaint/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"repmaint"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":14},{"a":true,"co":{"id":"GET /cubes/repmaint_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/repmaint_v2/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"repmaint_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":15},{"a":true,"co":{"id":"GET /cubes/uifwexp/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/cubes/uifwexp/facts","q":{"exist":["cut","drilldown"]},"r":{},"s":[{"lit":"cubes"},{"lit":"uifwexp"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":16}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"fact","name__orig":"fact","Name":"Fact","name_":"fact","name-":"fact","NAME":"FACT","index$":2}, {"active":true,"entity":"fact","key$":"BasicFactFlow","kind":"basic","name":"BasicFactFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"fact_ref01"}}],"index$":0}]}, 'Fact', {"GET /cubes/audit_opinions/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/bsheet/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/capital/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/capital_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/cflow/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/cflow_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/conditional_grants/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/demarcation_changes/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/financial_position_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/grants_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/incexp/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/incexp_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/municipalities/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/officials/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/repmaint/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/repmaint_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]},"GET /cubes/uifwexp/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by","required":false,"schema":{"type":"string"},"index$":1}]}})
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
  
