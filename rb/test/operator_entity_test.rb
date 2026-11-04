# Operator entity test

require "minitest/autorun"
require "json"
require_relative "../Coworkingview_sdk"
require_relative "runner"

class OperatorEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = CoworkingviewSDK.test(nil, nil)
    ent = testsdk.Operator(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = CoworkingviewConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = CoworkingviewSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Operator(nil).load({ "id" => 1, "locale" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = operator_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "operator." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "operator01" => "hq" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "operator", "slug", setup[:idmap]["operator01"]) do
        [{ "id" => setup[:idmap]["operator01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    operator_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.operator")))
    operator_ref01_data = nil
    if operator_ref01_data_raw.length > 0
      operator_ref01_data = Helpers.to_map(operator_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    operator_ref01_ent = client.Operator(nil)
    operator_ref01_match_dt0 = {
      "id" => operator_ref01_data["slug"],
    }
    if setup[:live]
      operator_ref01_match_dt0["locale"] = "en"
    end
    operator_ref01_data_dt0_loaded = operator_ref01_ent.load(operator_ref01_match_dt0, nil)
    operator_ref01_data_dt0_load_result = Helpers.to_map(operator_ref01_data_dt0_loaded.respond_to?(:data_get) ? operator_ref01_data_dt0_loaded.data_get : operator_ref01_data_dt0_loaded)
    assert !operator_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(operator_ref01_data_dt0_load_result["slug"], operator_ref01_data["slug"])

  end
end

def operator_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "operator", "OperatorTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  ((entity_data["existing"] || {})["operator"] || {}).each_value do |rec|
    rec["slug"] = rec["id"] if rec.is_a?(Hash) && !rec["id"].nil?
  end

  options = {}
  options["entity"] = entity_data["existing"]

  client = CoworkingviewSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["operator01", "operator02", "operator03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["COWORKINGVIEW_TEST_OPERATOR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "COWORKINGVIEW_TEST_OPERATOR_ENTID" => idmap,
    "COWORKINGVIEW_TEST_LIVE" => "FALSE",
    "COWORKINGVIEW_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["COWORKINGVIEW_TEST_OPERATOR_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["COWORKINGVIEW_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = CoworkingviewSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["COWORKINGVIEW_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["COWORKINGVIEW_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
