-- Operator entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("coworkingview_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("OperatorEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Operator(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Operator(nil):load({ ["id"] = 1, ["locale"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = operator_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "operator." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["operator01"] = "hq"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client
    if setup.live then
      runner.live_existing(pending, setup, LIVE_STRICT, "operator", function()
        return { { id = setup.idmap["operator01"] } }
      end, "slug", setup.idmap["operator01"])
    end

    -- Bootstrap entity data from existing test data.
    local operator_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.operator")))
    local operator_ref01_data = nil
    if #operator_ref01_data_raw > 0 then
      operator_ref01_data = helpers.to_map(operator_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local operator_ref01_ent = client:Operator(nil)
    local operator_ref01_match_dt0 = {
      id = operator_ref01_data["slug"],
    }
    if setup.live then
      operator_ref01_match_dt0["locale"] = "en"
    end
    local operator_ref01_data_dt0_loaded, err = operator_ref01_ent:load(operator_ref01_match_dt0, nil)
    assert.is_nil(err)
    local operator_ref01_data_dt0_load_result = helpers.to_map(type(operator_ref01_data_dt0_loaded) == 'table' and operator_ref01_data_dt0_loaded.data_get and operator_ref01_data_dt0_loaded:data_get() or operator_ref01_data_dt0_loaded)
    assert.is_not_nil(operator_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(operator_ref01_data_dt0_load_result["slug"], operator_ref01_data["slug"]))

  end)
end)

function operator_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/operator/OperatorTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read operator test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  for _, rec in pairs(((entity_data["existing"] or {})["operator"]) or {}) do
    if type(rec) == "table" and rec["id"] ~= nil then
      rec["slug"] = rec["id"]
    end
  end

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "operator01", "operator02", "operator03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("COWORKINGVIEW_TEST_OPERATOR_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["COWORKINGVIEW_TEST_OPERATOR_ENTID"] = idmap,
    ["COWORKINGVIEW_TEST_LIVE"] = "FALSE",
    ["COWORKINGVIEW_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["COWORKINGVIEW_TEST_OPERATOR_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["COWORKINGVIEW_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["COWORKINGVIEW_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["COWORKINGVIEW_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
