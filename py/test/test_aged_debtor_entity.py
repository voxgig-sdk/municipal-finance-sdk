# AgedDebtor entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from municipalfinance_sdk import MunicipalFinanceSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAgedDebtorEntity:

    def test_should_create_instance(self):
        testsdk = MunicipalFinanceSDK.test(None, None)
        ent = testsdk.AgedDebtor(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _aged_debtor_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "aged_debtor." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        aged_debtor_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.aged_debtor")))
        aged_debtor_ref01_data = None
        if len(aged_debtor_ref01_data_raw) > 0:
            aged_debtor_ref01_data = helpers.to_map(aged_debtor_ref01_data_raw[0][1])

        # LIST
        aged_debtor_ref01_ent = client.AgedDebtor(None)
        aged_debtor_ref01_match = {}

        aged_debtor_ref01_list_result = aged_debtor_ref01_ent.list(aged_debtor_ref01_match, None)
        assert isinstance(aged_debtor_ref01_list_result, list)



def _aged_debtor_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/aged_debtor/AgedDebtorTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MunicipalFinanceSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["aged_debtor01", "aged_debtor02", "aged_debtor03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID": idmap,
        "MUNICIPALFINANCE_TEST_LIVE": "FALSE",
        "MUNICIPALFINANCE_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("MUNICIPALFINANCE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = MunicipalFinanceSDK(helpers.to_map(merged_opts))

    _live = env.get("MUNICIPALFINANCE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MUNICIPALFINANCE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
