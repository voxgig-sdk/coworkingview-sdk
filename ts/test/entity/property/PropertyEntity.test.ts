

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


describe('PropertyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COWORKINGVIEW_TEST_LIVE=TRUE.
  afterEach(liveDelay('COWORKINGVIEW_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CoworkingviewSDK.test()
    const ent = testsdk.Property()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('property hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of CoworkingviewSDK.test(offline).Property().stream('list')) { }
    }, /offline/)

    for await (const _item of CoworkingviewSDK.test(offline).Property()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = CoworkingviewSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Property().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of CoworkingviewSDK.test().Property().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new CoworkingviewSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Property().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Property().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = CoworkingviewSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Property().list({"address":1,"locale":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COWORKINGVIEW_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'property.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":true,"t":"`$STRING`","key$":"address","index$":0},"amenities":{"a":true,"h":"Amenities","n":"amenities","r":true,"t":"`$ARRAY`","key$":"amenities","index$":1},"capacity":{"a":true,"h":"Capacity","n":"capacity","r":false,"t":"`$INTEGER`","key$":"capacity","index$":2},"capacity_status":{"a":true,"h":"Capacity Status","n":"capacity_status","r":false,"t":"`$STRING`","key$":"capacity_status","index$":3},"city":{"a":true,"h":"City","n":"city","r":true,"t":"`$OBJECT`","key$":"city","index$":4},"coordinates":{"a":true,"h":"Coordinates","n":"coordinates","r":true,"t":"`$OBJECT`","key$":"coordinates","index$":5},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"t":"`$STRING`","key$":"countryCode","index$":6},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":7},"distanceMeters":{"a":true,"h":"Distance Meters","n":"distanceMeters","r":false,"t":"`$NUMBER`","key$":"distanceMeters","index$":8},"excerpt":{"a":true,"h":"Excerpt","n":"excerpt","r":false,"t":"`$STRING`","key$":"excerpt","index$":9},"featured":{"a":true,"h":"Featured","n":"featured","r":true,"t":"`$BOOLEAN`","key$":"featured","index$":10},"fromBillingPeriod":{"a":true,"h":"From Billing Period","n":"fromBillingPeriod","r":false,"t":"`$STRING`","key$":"fromBillingPeriod","index$":11},"fromPrice":{"a":true,"h":"From Price","n":"fromPrice","r":true,"t":"`$OBJECT`","key$":"fromPrice","index$":12},"images":{"a":true,"h":"Images","n":"images","r":true,"t":"`$ARRAY`","key$":"images","index$":13},"indexabilityCompleteness":{"a":true,"h":"Indexability Completeness","n":"indexabilityCompleteness","r":false,"t":"`$ANY`","key$":"indexabilityCompleteness","index$":14},"indexabilityState":{"a":true,"h":"Indexability State","n":"indexabilityState","r":false,"t":"`$ANY`","key$":"indexabilityState","index$":15},"marketPosition":{"a":true,"h":"Market Position","n":"marketPosition","r":true,"t":"`$OBJECT`","key$":"marketPosition","index$":16},"operator":{"a":true,"h":"Operator","n":"operator","r":true,"t":"`$OBJECT`","key$":"operator","index$":17},"pricingOptions":{"a":true,"h":"Pricing Options","n":"pricingOptions","r":true,"t":"`$ARRAY`","key$":"pricingOptions","index$":18},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"t":"`$STRING`","key$":"slug","index$":19},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":20},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"When the underlying CMS record was last updated.","t":"`$STRING`","key$":"updatedAt","index$":21},"webUrl":{"a":true,"fo":"uri","h":"Web Url","n":"webUrl","r":true,"t":"`$STRING`","key$":"webUrl","index$":22},"zone":{"a":true,"h":"Zone","n":"zone","r":true,"t":"`$OBJECT`","key$":"zone","index$":23}},"id":{"field":"slug","name":"id"},"name":"property","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/properties","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"address","or":"address","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"amenity","or":"amenities","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":"berlin","k":"query","n":"city","or":"city","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"currency","or":"currency","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":6},{"a":true,"k":"query","n":"lng","or":"lng","r":false,"t":"`$NUMBER`","index$":7},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":true,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"max_price","or":"maxPrice","r":false,"t":"`$NUMBER`","index$":9},{"a":true,"ex":4,"k":"query","n":"min_capacity","or":"minCapacity","r":false,"t":"`$INTEGER`","index$":10},{"a":true,"k":"query","n":"min_price","or":"minPrice","r":false,"t":"`$NUMBER`","index$":11},{"a":true,"k":"query","n":"operator","or":"operator","r":false,"t":"`$STRING`","index$":12},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":13},{"a":true,"ex":2,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":14},{"a":true,"ex":"private_office","k":"query","n":"pricing_option_type","or":"pricingOptionType","r":false,"t":"`$STRING`","index$":15},{"a":true,"k":"query","n":"radius_meter","or":"radiusMeters","r":false,"t":"`$NUMBER`","index$":16},{"a":true,"k":"query","n":"seed","or":"seed","r":false,"t":"`$INTEGER`","index$":17},{"a":true,"k":"query","n":"sort_by","or":"sortBy","r":false,"t":"`$STRING`","index$":18},{"a":true,"k":"query","n":"zone","or":"zone","r":false,"t":"`$STRING`","index$":19}]},"k":"http","m":"GET","o":"/v1/properties","q":{"exist":["locale"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"properties"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /v1/properties/map","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"address","or":"address","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"amenity","or":"amenities","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"13.2,52.4,13.6,52.6","k":"query","n":"bbox","or":"bbox","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"city","or":"city","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"currency","or":"currency","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":6},{"a":true,"k":"query","n":"lng","or":"lng","r":false,"t":"`$NUMBER`","index$":7},{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":true,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"max_price","or":"maxPrice","r":false,"t":"`$NUMBER`","index$":9},{"a":true,"k":"query","n":"min_capacity","or":"minCapacity","r":false,"t":"`$INTEGER`","index$":10},{"a":true,"k":"query","n":"min_price","or":"minPrice","r":false,"t":"`$NUMBER`","index$":11},{"a":true,"k":"query","n":"operator","or":"operator","r":false,"t":"`$STRING`","index$":12},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":13},{"a":true,"ex":20,"k":"query","n":"page_size","or":"pageSize","r":false,"t":"`$INTEGER`","index$":14},{"a":true,"k":"query","n":"pricing_option_type","or":"pricingOptionType","r":false,"t":"`$STRING`","index$":15},{"a":true,"k":"query","n":"radius_meter","or":"radiusMeters","r":false,"t":"`$NUMBER`","index$":16},{"a":true,"k":"query","n":"seed","or":"seed","r":false,"t":"`$INTEGER`","index$":17},{"a":true,"k":"query","n":"sort_by","or":"sortBy","r":false,"t":"`$STRING`","index$":18},{"a":true,"k":"query","n":"zone","or":"zone","r":false,"t":"`$STRING`","index$":19}]},"k":"http","m":"GET","o":"/v1/properties/map","q":{"$action":"map","exist":["locale"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"properties"},{"lit":"map"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/properties/{slug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"hq-kings-cross-london","k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"en","k":"query","n":"locale","or":"locale","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/properties/{slug}","q":{"exist":["id","locale"]},"r":{"param":{"slug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"properties"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"property","name__orig":"property","Name":"Property","name_":"property","name-":"property","NAME":"PROPERTY","index$":7}, {"active":true,"entity":"property","key$":"BasicPropertyFlow","kind":"basic","name":"BasicPropertyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"property_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"property_ref01","srcdatavar":"property_ref01_data","suffix":"_dt0"},"m":{"id":"property01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-property_ref01"}}],"index$":1,"route":"GET /v1/properties/{slug}","record":{}}]}, 'Property', {"GET /v1/properties":{"protocol":"http","parameters":[{"name":"locale","in":"query","required":true,"schema":{"type":"string","enum":["en","de","es"]},"example":"en","index$":0},{"name":"page","in":"query","required":false,"schema":{"default":1,"type":"integer","exclusiveMinimum":0,"maximum":500},"index$":1},{"name":"pageSize","in":"query","required":false,"schema":{"default":20,"type":"integer","exclusiveMinimum":0,"maximum":50},"example":2,"index$":2},{"name":"seed","in":"query","required":false,"schema":{"type":"integer","minimum":0,"maximum":2147483647},"description":"Seed for sortBy=random. Required to paginate a random list: reuse the seed returned in meta.seed on every following page, or results repeat and skip.","index$":3},{"name":"country","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":4},{"name":"city","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"example":"berlin","index$":5},{"name":"zone","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":6},{"name":"operator","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":7},{"name":"pricingOptionType","in":"query","required":false,"schema":{"type":"string","enum":["private_office","exclusive_bereich","fix_desk","flex_desk","day_pass","meeting_room","virtual_office","event_space","membership"]},"example":"private_office","index$":8},{"name":"amenities","in":"query","required":false,"schema":{"type":"string"},"description":"Comma-separated amenity slugs, e.g. wifi,coffee,parking (max 20)","index$":9},{"name":"minCapacity","in":"query","required":false,"schema":{"type":"integer","exclusiveMinimum":0,"maximum":9007199254740991},"example":4,"index$":10},{"name":"minPrice","in":"query","required":false,"schema":{"type":"number","minimum":0},"index$":11},{"name":"maxPrice","in":"query","required":false,"schema":{"type":"number","minimum":0},"index$":12},{"name":"currency","in":"query","required":false,"schema":{"type":"string","enum":["EUR","GBP","USD","CHF","VES","AED"]},"index$":13},{"name":"sortBy","in":"query","required":false,"schema":{"type":"string","enum":["random","date-desc","date-asc","distance","price-asc"]},"description":"Result order. A legacy rating order is deprecated: it is still accepted and ordered as the default (random). It is not a member of this enum.","index$":14},{"name":"lat","in":"query","required":false,"schema":{"type":"number","minimum":-90,"maximum":90},"index$":15},{"name":"lng","in":"query","required":false,"schema":{"type":"number","minimum":-180,"maximum":180},"index$":16},{"name":"radiusMeters","in":"query","required":false,"schema":{"type":"number","exclusiveMinimum":0,"maximum":200000},"index$":17},{"name":"bbox","in":"query","required":false,"schema":{"type":"string"},"description":"Viewport as \"west,south,east,north\" in WGS84 degrees, e.g. 13.2,52.4,13.6,52.6","index$":18},{"name":"address","in":"query","required":false,"schema":{"type":"string","minLength":3,"maxLength":120},"description":"Street address, e.g. \"Domstraße 17\" or \"Calle Velázquez 34\". Narrows to listings AT that address (house number inside the listing's number or range) and on the same street; the ones at the address come first, each group in sortBy order. Not geocoded: to search AROUND an address, pass lat/lng + radiusMeters.","index$":19}]},"GET /v1/properties/map":{"protocol":"http","parameters":[{"name":"locale","in":"query","required":true,"schema":{"type":"string","enum":["en","de","es"]},"example":"en","index$":0},{"name":"page","in":"query","required":false,"schema":{"default":1,"type":"integer","exclusiveMinimum":0,"maximum":500},"index$":1},{"name":"pageSize","in":"query","required":false,"schema":{"default":20,"type":"integer","exclusiveMinimum":0,"maximum":50},"index$":2},{"name":"seed","in":"query","required":false,"schema":{"type":"integer","minimum":0,"maximum":2147483647},"description":"Seed for sortBy=random. Required to paginate a random list: reuse the seed returned in meta.seed on every following page, or results repeat and skip.","index$":3},{"name":"country","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":4},{"name":"city","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":5},{"name":"zone","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":6},{"name":"operator","in":"query","required":false,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"index$":7},{"name":"pricingOptionType","in":"query","required":false,"schema":{"type":"string","enum":["private_office","exclusive_bereich","fix_desk","flex_desk","day_pass","meeting_room","virtual_office","event_space","membership"]},"index$":8},{"name":"amenities","in":"query","required":false,"schema":{"type":"string"},"description":"Comma-separated amenity slugs, e.g. wifi,coffee,parking (max 20)","index$":9},{"name":"minCapacity","in":"query","required":false,"schema":{"type":"integer","exclusiveMinimum":0,"maximum":9007199254740991},"index$":10},{"name":"minPrice","in":"query","required":false,"schema":{"type":"number","minimum":0},"index$":11},{"name":"maxPrice","in":"query","required":false,"schema":{"type":"number","minimum":0},"index$":12},{"name":"currency","in":"query","required":false,"schema":{"type":"string","enum":["EUR","GBP","USD","CHF","VES","AED"]},"index$":13},{"name":"sortBy","in":"query","required":false,"schema":{"type":"string","enum":["random","date-desc","date-asc","distance","price-asc"]},"description":"Result order. A legacy rating order is deprecated: it is still accepted and ordered as the default (random). It is not a member of this enum.","index$":14},{"name":"lat","in":"query","required":false,"schema":{"type":"number","minimum":-90,"maximum":90},"index$":15},{"name":"lng","in":"query","required":false,"schema":{"type":"number","minimum":-180,"maximum":180},"index$":16},{"name":"radiusMeters","in":"query","required":false,"schema":{"type":"number","exclusiveMinimum":0,"maximum":200000},"index$":17},{"name":"bbox","in":"query","required":false,"schema":{"type":"string"},"description":"Viewport as \"west,south,east,north\" in WGS84 degrees, e.g. 13.2,52.4,13.6,52.6","example":"13.2,52.4,13.6,52.6","index$":18},{"name":"address","in":"query","required":false,"schema":{"type":"string","minLength":3,"maxLength":120},"description":"Street address, e.g. \"Domstraße 17\" or \"Calle Velázquez 34\". Narrows to listings AT that address (house number inside the listing's number or range) and on the same street; the ones at the address come first, each group in sortBy order. Not geocoded: to search AROUND an address, pass lat/lng + radiusMeters.","index$":19}]},"GET /v1/properties/{slug}":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"schema":{"type":"string","minLength":1,"maxLength":200,"pattern":"^[a-z0-9-]+$"},"example":"hq-kings-cross-london","index$":0},{"name":"locale","in":"query","required":true,"schema":{"type":"string","enum":["en","de","es"]},"example":"en","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let property_ref01_data = Object.values(setup.data.existing.property)[0] as any

    // LIST
    const property_ref01_ent = client.Property()
    const property_ref01_match: any = {}

    const property_ref01_list = (await property_ref01_ent.list(property_ref01_match)).map((e: any) => e.data())


    // LOAD
    const property_ref01_match_dt0: any = {}
    property_ref01_match_dt0.id = property_ref01_data.slug
    const property_ref01_data_dt0 = (await property_ref01_ent.load(property_ref01_match_dt0)).data()
    assert(property_ref01_data_dt0.slug === property_ref01_data.slug)


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
      '../../../../.sdk/test/entity/property/PropertyTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  for (const rec of Object.values(entityData.existing?.["property"] ?? {}) as any[]) {
    if (null != rec?.id) rec.slug = rec.id
  }

  options.entity = entityData.existing

  let client = CoworkingviewSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['property01','property02','property03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COWORKINGVIEW_TEST_PROPERTY_ENTID': idmap,
    'COWORKINGVIEW_TEST_LIVE': 'FALSE',
    'COWORKINGVIEW_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COWORKINGVIEW_TEST_PROPERTY_ENTID']

  const live = 'TRUE' === env.COWORKINGVIEW_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COWORKINGVIEW_TEST_PROPERTY_ENTID']
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
  
