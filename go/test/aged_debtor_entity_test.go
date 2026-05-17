package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/municipal-finance-sdk/go"
	"github.com/voxgig-sdk/municipal-finance-sdk/go/core"

	vs "github.com/voxgig-sdk/municipal-finance-sdk/go/utility/struct"
)

func TestAgedDebtorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AgedDebtor(nil)
		if ent == nil {
			t.Fatal("expected non-nil AgedDebtorEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := aged_debtorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "aged_debtor." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		agedDebtorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.aged_debtor", setup.data)))
		var agedDebtorRef01Data map[string]any
		if len(agedDebtorRef01DataRaw) > 0 {
			agedDebtorRef01Data = core.ToMapAny(agedDebtorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = agedDebtorRef01Data

		// LIST
		agedDebtorRef01Ent := client.AgedDebtor(nil)
		agedDebtorRef01Match := map[string]any{}

		agedDebtorRef01ListResult, err := agedDebtorRef01Ent.List(agedDebtorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, agedDebtorRef01ListOk := agedDebtorRef01ListResult.([]any)
		if !agedDebtorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", agedDebtorRef01ListResult)
		}

	})
}

func aged_debtorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "aged_debtor", "AgedDebtorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read aged_debtor test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse aged_debtor test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"aged_debtor01", "aged_debtor02", "aged_debtor03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID": idmap,
		"MUNICIPALFINANCE_TEST_LIVE":      "FALSE",
		"MUNICIPALFINANCE_TEST_EXPLAIN":   "FALSE",
		"MUNICIPALFINANCE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MUNICIPALFINANCE_TEST_AGED_DEBTOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MUNICIPALFINANCE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MUNICIPALFINANCE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMunicipalFinanceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MUNICIPALFINANCE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MUNICIPALFINANCE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
