

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


describe('AgedCreditorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MUNICIPAL_FINANCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('MUNICIPAL_FINANCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MunicipalFinanceSDK.test()
    const ent = testsdk.AgedCreditor()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MUNICIPAL_FINANCE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'aged_creditor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount_sum":{"a":true,"h":"Amount Sum","n":"amount_sum","r":false,"sh":"Sum of the amount","t":"`$NUMBER`","key$":"amount_sum","index$":0},"amount_type_code":{"a":true,"h":"Amount Type Code","n":"amount_type_code","r":false,"sh":"Amount type code","t":"`$STRING`","key$":"amount_type_code","index$":1},"amount_type_label":{"a":true,"h":"Amount Type Label","n":"amount_type_label","r":false,"sh":"Amount type label","t":"`$STRING`","key$":"amount_type_label","index$":2},"demarcation_code":{"a":true,"h":"Demarcation Code","n":"demarcation_code","r":false,"sh":"Municipality demarcation code","t":"`$STRING`","key$":"demarcation_code","index$":3},"demarcation_label":{"a":true,"h":"Demarcation Label","n":"demarcation_label","r":false,"sh":"Municipality name","t":"`$STRING`","key$":"demarcation_label","index$":4},"financial_period_period":{"a":true,"h":"Financial Period Period","n":"financial_period_period","r":false,"sh":"Financial period number","t":"`$INTEGER`","key$":"financial_period_period","index$":5},"financial_year_end_year":{"a":true,"h":"Financial Year End Year","n":"financial_year_end_year","r":false,"sh":"Financial year end","t":"`$INTEGER`","key$":"financial_year_end_year","index$":6},"item_code":{"a":true,"h":"Item Code","n":"item_code","r":false,"sh":"Item code","t":"`$STRING`","key$":"item_code","index$":7},"item_composition":{"a":true,"h":"Item Composition","n":"item_composition","r":false,"sh":"Item composition formula","t":"`$STRING`","key$":"item_composition","index$":8},"item_label":{"a":true,"h":"Item Label","n":"item_label","r":false,"sh":"Item label","t":"`$STRING`","key$":"item_label","index$":9},"item_position_in_return_form":{"a":true,"h":"Item Position In Return Form","n":"item_position_in_return_form","r":false,"sh":"Position in return form","t":"`$INTEGER`","key$":"item_position_in_return_form","index$":10},"item_return_form_structure":{"a":true,"h":"Item Return Form Structure","n":"item_return_form_structure","r":false,"sh":"Return form structure","t":"`$STRING`","key$":"item_return_form_structure","index$":11},"period_length_length":{"a":true,"h":"Period Length Length","n":"period_length_length","r":false,"sh":"Period length","t":"`$STRING`","key$":"period_length_length","index$":12}},"name":"aged_creditor","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /cubes/aged_creditor/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"amount.sum","k":"query","n":"aggregate","or":"aggregates","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"financial_year_end.year:2020|demarcation.code:CPT","k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"item.code|financial_period.period","k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"financial_period.period:asc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":10000,"k":"query","n":"pagesize","or":"pagesize","r":false,"t":"`$INTEGER`","index$":5}]},"k":"http","m":"GET","o":"/cubes/aged_creditor/facts","q":{"$action":"fact","exist":["aggregate","cut","drilldown","order","page","pagesize"]},"r":{},"s":[{"lit":"cubes"},{"lit":"aged_creditor"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":0},{"a":true,"co":{"id":"GET /cubes/aged_creditor_v2/facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"aggregate","or":"aggregates","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"cut","or":"cut","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"drilldown","or":"drilldown","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":0,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"ex":10000,"k":"query","n":"pagesize","or":"pagesize","r":false,"t":"`$INTEGER`","index$":5}]},"k":"http","m":"GET","o":"/cubes/aged_creditor_v2/facts","q":{"exist":["aggregate","cut","drilldown","order","page","pagesize"]},"r":{},"s":[{"lit":"cubes"},{"lit":"aged_creditor_v2"},{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body.cells`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"aged_creditor","name__orig":"aged_creditor","Name":"AgedCreditor","name_":"aged_creditor","name-":"aged-creditor","NAME":"AGED_CREDITOR","index$":0}, {"active":true,"entity":"aged_creditor","key$":"BasicAgedCreditorFlow","kind":"basic","name":"BasicAgedCreditorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"aged_creditor_ref01"}}],"index$":0}]}, 'AgedCreditor', {"GET /cubes/aged_creditor/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions using pipe-separated dimension:value pairs","required":false,"schema":{"type":"string"},"example":"financial_year_end.year:2020|demarcation.code:CPT","index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by (pipe-separated)","required":false,"schema":{"type":"string"},"example":"item.code|financial_period.period","index$":1},{"name":"aggregates","in":"query","description":"Aggregation measures to return","required":false,"schema":{"type":"string"},"example":"amount.sum","index$":2},{"name":"order","in":"query","description":"Order results by specified field","required":false,"schema":{"type":"string"},"example":"financial_period.period:asc","index$":3},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":0},"index$":4},{"name":"pagesize","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10000},"index$":5}]},"GET /cubes/aged_creditor_v2/facts":{"protocol":"http","parameters":[{"name":"cut","in":"query","description":"Filter dimensions using pipe-separated dimension:value pairs","required":false,"schema":{"type":"string"},"index$":0},{"name":"drilldown","in":"query","description":"Dimensions to group by (pipe-separated)","required":false,"schema":{"type":"string"},"index$":1},{"name":"aggregates","in":"query","description":"Aggregation measures to return","required":false,"schema":{"type":"string"},"index$":2},{"name":"order","in":"query","description":"Order results by specified field","required":false,"schema":{"type":"string"},"index$":3},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":0},"index$":4},{"name":"pagesize","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10000},"index$":5}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let aged_creditor_ref01_data = Object.values(setup.data.existing.aged_creditor)[0] as any

    // LIST
    const aged_creditor_ref01_ent = client.AgedCreditor()
    const aged_creditor_ref01_match: any = {}

    const aged_creditor_ref01_list = (await aged_creditor_ref01_ent.list(aged_creditor_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/aged_creditor/AgedCreditorTestData.json')

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
    ['aged_creditor01','aged_creditor02','aged_creditor03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MUNICIPAL_FINANCE_TEST_AGED_CREDITOR_ENTID': idmap,
    'MUNICIPAL_FINANCE_TEST_LIVE': 'FALSE',
    'MUNICIPAL_FINANCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MUNICIPAL_FINANCE_TEST_AGED_CREDITOR_ENTID']

  const live = 'TRUE' === env.MUNICIPAL_FINANCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MUNICIPAL_FINANCE_TEST_AGED_CREDITOR_ENTID']
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
  
