

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


describe('ConfigEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COWORKINGVIEW_TEST_LIVE=TRUE.
  afterEach(liveDelay('COWORKINGVIEW_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CoworkingviewSDK.test()
    const ent = testsdk.Config()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CoworkingviewSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Config().load({"minSupportedBuild":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COWORKINGVIEW_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'config.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"flags":{"a":true,"h":"Flags","n":"flags","r":true,"t":"`$OBJECT`","key$":"flags","index$":0},"message":{"a":true,"h":"Message","n":"message","r":true,"t":"`$OBJECT`","key$":"message","index$":1},"minSupportedBuild":{"a":true,"h":"Min Supported Build","n":"minSupportedBuild","r":true,"t":"`$INTEGER`","key$":"minSupportedBuild","index$":2},"recommendedBuild":{"a":true,"h":"Recommended Build","n":"recommendedBuild","r":false,"t":"`$INTEGER`","key$":"recommendedBuild","index$":3}},"name":"config","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/config","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/config","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"config"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"config","name__orig":"config","Name":"Config","name_":"config","name-":"config","NAME":"CONFIG","index$":0}, {"active":true,"entity":"config","key$":"BasicConfigFlow","kind":"basic","name":"BasicConfigFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"config_ref01","srcdatavar":"config_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-config_ref01"}}],"index$":0}]}, 'Config', {"GET /v1/config":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let config_ref01_data = Object.values(setup.data.existing.config)[0] as any

    // LOAD
    const config_ref01_ent = client.Config()
    const config_ref01_match_dt0: any = {}
    const config_ref01_data_dt0 = (await config_ref01_ent.load(config_ref01_match_dt0)).data()
    assert(null != config_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/config/ConfigTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CoworkingviewSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['config01','config02','config03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COWORKINGVIEW_TEST_CONFIG_ENTID': idmap,
    'COWORKINGVIEW_TEST_LIVE': 'FALSE',
    'COWORKINGVIEW_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COWORKINGVIEW_TEST_CONFIG_ENTID']

  const live = 'TRUE' === env.COWORKINGVIEW_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COWORKINGVIEW_TEST_CONFIG_ENTID']
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
  
