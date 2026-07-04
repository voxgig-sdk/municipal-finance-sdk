# AgedCreditor entity test

require "minitest/autorun"
require "json"
require_relative "../MunicipalFinance_sdk"
require_relative "runner"

class AgedCreditorEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MunicipalFinanceSDK.test(nil, nil)
    ent = testsdk.AgedCreditor(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = aged_creditor_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "aged_creditor." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MUNICIPALFINANCE_TEST_AGED_CREDITOR_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    aged_creditor_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.aged_creditor")))
    aged_creditor_ref01_data = nil
    if aged_creditor_ref01_data_raw.length > 0
      aged_creditor_ref01_data = Helpers.to_map(aged_creditor_ref01_data_raw[0][1])
    end

    # LIST
    aged_creditor_ref01_ent = client.AgedCreditor(nil)
    aged_creditor_ref01_match = {}

    aged_creditor_ref01_list_result = aged_creditor_ref01_ent.list(aged_creditor_ref01_match, nil)
    assert aged_creditor_ref01_list_result.is_a?(Array)

  end
end

def aged_creditor_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "aged_creditor", "AgedCreditorTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MunicipalFinanceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["aged_creditor01", "aged_creditor02", "aged_creditor03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MUNICIPALFINANCE_TEST_AGED_CREDITOR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MUNICIPALFINANCE_TEST_AGED_CREDITOR_ENTID" => idmap,
    "MUNICIPALFINANCE_TEST_LIVE" => "FALSE",
    "MUNICIPALFINANCE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["MUNICIPALFINANCE_TEST_AGED_CREDITOR_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MUNICIPALFINANCE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = MunicipalFinanceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MUNICIPALFINANCE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MUNICIPALFINANCE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
