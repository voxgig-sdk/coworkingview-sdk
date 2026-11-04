

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CoworkingviewSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('OperatorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COWORKINGVIEW_TEST_LIVE=TRUE.
  afterEach(liveDelay('COWORKINGVIEW_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CoworkingviewSDK.test()
    const ent = testsdk.Operator()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CoworkingviewSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Operator().load({"id":1,"locale":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COWORKINGVIEW_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'operator.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"asOf":{"a":true,"fo":"date-time","h":"As Of","n":"asOf","r":true,"t":"`$STRING`","key$":"asOf","index$":0},"cities":{"a":true,"h":"Cities","n":"cities","r":true,"t":"`$ARRAY`","key$":"cities","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":2},"faqs":{"a":true,"h":"Faqs","n":"faqs","r":true,"t":"`$ARRAY`","key$":"faqs","index$":3},"indexabilityBrand":{"a":true,"h":"Indexability Brand","n":"indexabilityBrand","r":false,"t":"`$ANY`","key$":"indexabilityBrand","index$":4},"logo":{"a":true,"h":"Logo","n":"logo","r":true,"t":"`$OBJECT`","key$":"logo","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"t":"`$STRING`","key$":"name","index$":6},"pricePosition":{"a":true,"h":"Price Position","n":"pricePosition","r":true,"t":"`$OBJECT`","key$":"pricePosition","index$":7},"propertyCount":{"a":true,"h":"Property Count","n":"propertyCount","r":true,"t":"`$INTEGER`","key$":"propertyCount","index$":8},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":9},"tagline":{"a":true,"h":"Tagline","n":"tagline","r":false,"t":"`$STRING`","key$":"tagline","index$":10}},"id":{"field":"slug","name":"id"},"name":"operator","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/operators/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hq","k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/operators/{slug}","q":{"exist":["id","locale"]},"r":{"param":{"slug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"operators"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"operator","name__orig":"operator","Name":"Operator","name_":"operator","name-":"operator","NAME":"OPERATOR","index$":5}, {"active":true,"entity":"operator","key$":"BasicOperatorFlow","kind":"basic","name":"BasicOperatorFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"operator_ref01","srcdatavar":"operator_ref01_data","suffix":"_dt0"},"m":{"id":"operator01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-operator_ref01"}}],"index$":0,"route":"GET /v1/operators/{slug}","record":{}}]}, 'Operator', {"GET /v1/operators/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"example":"hq","index$":0},{"name":"locale","in":"query","required":true,"schema":{"type":"string","enum":["en","de","es"]},"example":"en","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let operator_ref01_data = Object.values(setup.data.existing.operator)[0] as any

    // LOAD
    const operator_ref01_ent = client.Operator()
    const operator_ref01_match_dt0: any = {}
    operator_ref01_match_dt0.id = operator_ref01_data.slug
    const operator_ref01_data_dt0 = (await operator_ref01_ent.load(operator_ref01_match_dt0)).data()
    assert(operator_ref01_data_dt0.slug === operator_ref01_data.slug)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/operator/OperatorTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  for (const rec of Object.values(entityData.existing?.["operator"] ?? {}) as any[]) {
    if (null != rec?.id) rec.slug = rec.id
  }

  options.entity = entityData.existing

  let client = CoworkingviewSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['operator01','operator02','operator03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COWORKINGVIEW_TEST_OPERATOR_ENTID': idmap,
    'COWORKINGVIEW_TEST_LIVE': 'FALSE',
    'COWORKINGVIEW_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COWORKINGVIEW_TEST_OPERATOR_ENTID']

  const live = 'TRUE' === env.COWORKINGVIEW_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COWORKINGVIEW_TEST_OPERATOR_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CoworkingviewSDK(merge([
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
    explain: 'TRUE' === env.COWORKINGVIEW_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
